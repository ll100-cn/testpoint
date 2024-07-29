<template>
  <div class="pt-2">
    <input type="hidden" value="" :disabled="presenterConfig.disabled">
    <div v-for="item in collection" class="form-check form-check-inline">
      <input v-model="modelValue" class="form-check-input" type="checkbox" :value="item[valueMethod]">
      <label class="form-check-label">{{ item[labelMethod] }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, HTMLAttributes, InputHTMLAttributes } from 'vue'
import { ControlConfig, FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types';
import { ControlProps } from '../simple_form/helper'

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
