<template>
  <textarea v-model="modelValue" :class="cn(inputPresenter.input(inputPresenterConfig), props.class)" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, type HTMLAttributes, type InputHTMLAttributes } from 'vue'
import { type ControlConfig, type FormPresenterConfig, relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types';
import { cn } from '$ui/utils'
import { useInputPresenters, type InputPresenterConfig } from '$ui/input'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const inputPresenters = useInputPresenters()
const inputPresenter = computed(() => inputPresenters.standard)

const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

const inputPresenterConfig = computed(() => {
  const config = {} as InputPresenterConfig
  config.size = presenterConfig.value.size ?? 'default'
  return config
})
</script>
