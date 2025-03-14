<template>
  <div class="flex gap-3 flex-wrap" :id="controlId">
    <label v-for="item in options" class="inline-flex items-center">
      <Checkbox v-model="modelValue" :value="item.value" v-bind="radioAttrs" />
      <span class="ms-1">{{ item.label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
export type Props = {
  class?: HTMLAttributes['class']
  options: OptionItem[]
  includeBlank?: boolean | string
}
</script>

<script lang="ts" setup>
import { Checkbox, type InputPresenterConfig, type OptionItem } from "$ui/input"
import { relayFormPresenterConfig, useControlId, useControlValue, type FormPresenterConfig } from "$ui/simple_form"
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {
  includeBlank: false,
})

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel<(number | string)[]>()
const modelValue = useControlValue(defaultModelValue)
const controlId = useControlId()

const radioAttrs = computed(() => {
  const result = {} as InputHTMLAttributes & Partial<InputPresenterConfig>
  result.size = presenterConfig.value.size ?? 'default'

  if (presenterConfig.value.disabled) {
    result.disabled = true
  }

  return result
})
</script>
