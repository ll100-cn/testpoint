<template>
  <label class="inline-flex items-center self-center">
    <Checkbox :id="controlId" v-bind="radioAttrs" v-model="modelValue" :value="1" />
    <span class="ms-1"><slot /></span>
  </label>
</template>

<script lang="ts">
export type Props = {
  class?: HTMLAttributes['class']
}
</script>

<script lang="ts" setup>
import { Checkbox, type InputPresenterConfig } from "$ui/input"
import { relayFormPresenterConfig, useControlId, useControlValue, type FormPresenterConfig } from "$ui/simple_form"
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {
})

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel<boolean>()
const rawModelValue = useControlValue(defaultModelValue)
const controlId = useControlId()

const modelValue = computed({
  get: () => rawModelValue.value ? [1] : [],
  set: (value: number[]) => {
    rawModelValue.value = value.includes(1)
  },
})

const radioAttrs = computed(() => {
  const result = {} as InputHTMLAttributes & Partial<InputPresenterConfig>
  result.size = presenterConfig.value.size ?? 'default'

  if (presenterConfig.value.disabled) {
    result.disabled = true
  }

  return result
})
</script>
