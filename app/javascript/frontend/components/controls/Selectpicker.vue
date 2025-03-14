<template>
  <SelectdropRoot :multiple="false">
    <SelectdropItem :value="null" v-if="includeBlankText != null">
      <span v-if="includeBlankText.trim() == ''">&nbsp;</span>
      <span v-else>{{ includeBlankText }}</span>
    </SelectdropItem>
    <slot></slot>

    <template v-if="slots.menuAfter" #menuAfter>
      <slot name="menuAfter"></slot>
    </template>
  </SelectdropRoot>
</template>

<script setup lang="ts">
import { ControlValueKey, relayFormPresenterConfig, useControlValue, type FormPresenterConfig } from '$ui/simple_form'
import { computed, provide } from "vue"
import { SelectdropRoot } from './selectdrop'
import SelectdropItem from './selectdrop/SelectdropItem.vue'

interface Props {
  includeBlank?: boolean | string
}

const props = withDefaults(defineProps<Props & FormPresenterConfig>(), {
  includeBlank: true
})

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel<string | number | null>()
const modelValue = useControlValue(defaultModelValue)

const slots = defineSlots()

const includeBlankText = computed(() => {
  if (props.includeBlank === false) {
    return null
  }

  if (props.includeBlank === true || props.includeBlank == '') {
    return ''
  }

  return props.includeBlank
})

provide(ControlValueKey, computed<(string | number)[]>({
  get: () => {
    if (modelValue.value) {
      return [modelValue.value]
    } else {
      return []
    }
  },
  set: (value) => {
    if (value) {
      modelValue.value = value[0] ?? null
    } else {
      modelValue.value = null
    }
  }
}))
</script>
