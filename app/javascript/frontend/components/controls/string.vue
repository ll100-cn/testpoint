<template>
  <input v-model="modelValue" :type="type" :class="cn(standard.input(presenterConfig), props.class)" :disabled="presenterConfig.disabled" >
</template>

<script lang="ts">
export interface Props {
  type?: InputHTMLAttributes['type']
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, type HTMLAttributes, type InputHTMLAttributes } from 'vue'
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types';
import { standard } from './presets'
import { cn } from '$ui/utils'

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
  type: 'text'
})

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
</script>
