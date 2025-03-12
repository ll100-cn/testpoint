<template>
  <Select v-bind="{ ...inputPresenterConfig, ...inputAttrs }" v-model="modelValue">
    <option v-if="includeBlank !== false" :value="null">{{ includeBlank || "" }}</option>
    <slot />
  </Select>
</template>

<script setup lang="ts">
import { Select, type InputPresenterConfig } from '$ui/input'
import { relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue, type ControlConfig, type FormPresenterConfig } from '$ui/simple_form'
import { Validation } from "@/models"
import { computed, provide, type HTMLAttributes } from "vue"

interface Props {
  includeBlank?: string | boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
  includeBlank: false,
})

const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

provide('model_value', modelValue)

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
    attrs['data-placeholder'] = true
  }

  if (controlConfig.value.id) {
    attrs.id = controlConfig.value.id
  }

  return attrs
})

const isBlank = computed(() => [null, undefined].includes(modelValue.value))
</script>
