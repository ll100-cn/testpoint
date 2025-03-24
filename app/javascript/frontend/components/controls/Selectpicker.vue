<template>
  <Select v-model="modelValue" :items-repo="itemsRepo" v-model:open="open">
    <SelectTrigger>
      <SelectValue #="{ compactSelectedNodes }">
        <span data-placeholder v-if="isBlank">{{ includeBlankText }}</span>
        <template v-else>
          <template v-for="vnode in compactSelectedNodes[0]">
            <component :is="vnode" />
          </template>
        </template>
      </SelectValue>
    </SelectTrigger>
    <SelectContent #="{ counts }">
      <SelectItem v-if="allowIncludeBlank" :value="null">
        <span data-placeholder>{{ includeBlankText }}&nbsp;</span>
      </SelectItem>

      <slot></slot>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, type SelectItemAttrs, } from '$ui/select'
import { useControlValue } from '$ui/simple_form'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  includeBlank?: boolean | string
}>(), {
  includeBlank: true
})

const defaultModelValue = defineModel<string | number | null>()
const modelValueRaw = useControlValue(defaultModelValue)
const modelValue = computed<string | number | null>({
  get() { return modelValueRaw.value ?? null },
  set(value) { modelValueRaw.value = value },
})

const isBlank = computed(() => {
  return !modelValue.value
})

const allowIncludeBlank = computed(() => {
  return props.includeBlank !== false
})

const includeBlankText = computed(() => {
  if (props.includeBlank === true) {
    return ' '
  }

  if (props.includeBlank === '') {
    return ' '
  }

  return props.includeBlank
})

const itemsRepo = ref(new Map<string, SelectItemAttrs>())
const open = ref(false)
</script>