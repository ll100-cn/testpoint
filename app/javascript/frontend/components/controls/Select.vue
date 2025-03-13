<template>
  <Select v-bind="{ ...inputPresenterConfig, ...inputAttrs }" v-model="modelValue">
    <option v-if="includeBlank !== false" :value="null">{{ includeBlank || "" }}</option>
    <slot />
  </Select>
</template>

<script setup lang="ts">
import { Select, type InputPresenterConfig } from '$ui/input'
import { relayFormPresenterConfig, useControlId, useControlValue, type FormPresenterConfig } from '$ui/simple_form'
import { computed, type HTMLAttributes } from "vue"

interface Props {
  includeBlank?: string | boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {
  includeBlank: false,
})

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel()
const modelValue = useControlValue(defaultModelValue)
const controlId = useControlId()

const inputPresenterConfig = computed(() => {
  const config = {} as InputPresenterConfig
  config.size = presenterConfig.value.size ?? 'default'
  return config
})
const inputAttrs = computed(() => {
  const attrs = { class: [] } as any

  if (presenterConfig.value.disabled) {
    attrs.disabled = true
  }

  if (isBlank.value) {
    attrs['data-placeholder'] = ''
  }

  attrs.id = controlId

  return attrs
})

const isBlank = computed(() => [null, undefined].includes(modelValue.value))
</script>
