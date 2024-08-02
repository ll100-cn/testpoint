<template>
  <textarea v-model="modelValue" :class="cn(standard.input(presenterConfig), props.class)" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, type HTMLAttributes, type InputHTMLAttributes } from 'vue'
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types';
import { standard } from './presets'
import { cn } from '$vendor/ui/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())


</script>
