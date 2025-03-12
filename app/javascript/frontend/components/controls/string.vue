<template>
  <Text v-model="modelValue" type="text" :disabled="presenterConfig.disabled" />
</template>

<script lang="ts">
export interface Props {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import { Text } from '$ui/input'
import { type ControlConfig, type FormPresenterConfig, relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form'
import { Validation } from '@/models'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
})

const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
</script>
