<template>
  <label class="inline-flex items-center self-center">
    <Checkbox :id="controlConfig.id" v-bind="radioAttrs" v-model="modelValue" :value="1" />
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
import { relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue, Validation, type ControlConfig, type FormPresenterConfig } from "$ui/simple_form"
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
})

const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel<boolean>()
const rawModelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

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
