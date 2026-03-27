<template>
  <Text v-bind="inputPresenterConfig" v-model="modelValue" type="text" :disabled="presenterConfig.disabled" :id="controlId" />
</template>

<script lang="ts">
export interface Props {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import { Text, type InputPresenterConfig } from '$ui/input'
import { relayFormPresenterConfig, useControlId, useControlValue, type FormPresenterConfig } from '$ui/simple_form'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {
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
</script>
