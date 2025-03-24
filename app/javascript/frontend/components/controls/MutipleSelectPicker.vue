<template>
  <Select v-model="modelValue" multiple :items-repo="itemsRepo" v-model:open="open">
    <SelectTrigger>
      <SelectValue #="{ compactSelectedNodes }">
        <span data-placeholder v-if="isBlank">{{ includeBlank }}</span>
        <template v-else-if="compactSelectedNodes.length == 1">
          <template v-for="vnode in compactSelectedNodes[0]">
            <component :is="vnode" />
          </template>
        </template>
        <template v-else-if="(modelValue ?? []).length >= itemsRepo.size ">
          全部
        </template>
        <template v-else>
          已选择 {{ modelValue.length }} 项
        </template>
      </SelectValue>
    </SelectTrigger>
    <SelectContent #="{ counts }">
      <div class="space-x-3 px-3 py-1 text-sm">
        <button type="button" class="link cursor-pointer" @click="onSelectAll">全部 <small>({{ itemsRepo.size }})</small></button>
        <button type="button" class="link cursor-pointer" @click="onSelectNone">无 <small>(0)</small></button>
      </div>
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

const defaultModelValue = defineModel<(string | number)[]>()
const modelValue = useControlValue(defaultModelValue)

const isBlank = computed(() => {
  return (modelValue.value ?? []).length === 0
})

const includeBlank = computed(() => {
  return typeof props.includeBlank === 'string' ? props.includeBlank : ''
})

const itemsRepo = ref(new Map<string, SelectItemAttrs>())
const open = ref(false)

const onSelectAll = () => {
  modelValue.value = Array.from(itemsRepo.value.values()).map(it => it.value) as any
  open.value = false
}

const onSelectNone = () => {
  modelValue.value = []
  open.value = false
}
</script>