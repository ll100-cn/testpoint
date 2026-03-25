<template>
  <textarea v-model="modelValue" :id="controlId" :class="cn(inputPresenter.input(inputPresenterConfig), props.class)" />
</template>

<script setup lang="ts">
import { useInputPresenters, type InputPresenterConfig } from '$ui/input'
import { relayFormPresenterConfig, useControlId, useControlValue, type FormPresenterConfig } from '$ui/simple_form'
import { cn } from '$ui/utils'
import { computed, type HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<FormPresenterConfig>>()

const inputPresenters = useInputPresenters()
const inputPresenter = computed(() => inputPresenters.standard)

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel()
const modelValue = useControlValue(defaultModelValue)
const controlId = useControlId()

const inputPresenterConfig = computed(() => {
  const config = {} as InputPresenterConfig
  config.size = presenterConfig.value.size ?? 'default'
  return config
})
</script>
