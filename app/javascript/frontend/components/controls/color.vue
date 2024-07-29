<template>
  <input v-model="modelValue" type="color" class="form-control">
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, HTMLAttributes, InputHTMLAttributes } from 'vue'
import { ControlConfig, FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types';

interface Props {
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
