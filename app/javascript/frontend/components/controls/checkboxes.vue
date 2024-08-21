<template>
  <div class="space-x-2">
    <input type="hidden" value="" :disabled="presenterConfig.disabled">
    <span v-for="item in collection">
      <input v-model="modelValue" type="checkbox" :class="cn(standard.checkbox(presenterConfig), props.class)" :value="item[valueMethod]" :disabled="presenterConfig.disabled">
      <label>{{ item[labelMethod] }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, type HTMLAttributes, type InputHTMLAttributes } from 'vue'
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types';
import { type ControlProps } from '../simple_form/helper'
import { standard } from './presets'
import { cn } from '$vendor/ui/utils'

interface Props extends ControlProps {
  collection: Object
  labelMethod: string
  valueMethod: string
  type?: InputHTMLAttributes['type']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
</script>
