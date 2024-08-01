<template>
  <div class="space-x-2">
    <input type="hidden" value="" :disabled="presenterConfig.disabled">
    <span v-for="item in collection">
      <input v-model="modelValue" type="checkbox" :value="item[valueMethod]">
      <label>{{ item[labelMethod] }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, type HTMLAttributes, type InputHTMLAttributes } from 'vue'
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types';
import { type ControlProps } from '../simple_form/helper'

interface Props extends ControlProps {
  collection: Object
  labelMethod: string
  valueMethod: string
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
</script>
