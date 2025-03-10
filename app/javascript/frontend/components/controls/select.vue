<template>
  <select v-model="modelValue" :class="cn(standard.input(presenterConfig), props.class)" v-bind="control_attrs" @change="emit('change', $event)">
    <option v-if="include_blank !== false" value>{{ include_blank || "" }}</option>
    <slot />
  </select>
</template>

<script setup lang="ts">
import { Validation } from "@/models"
import * as helper from "../simple_form/helper"
import { type ControlProps } from "../simple_form/helper"
import { computed, provide, type HTMLAttributes } from "vue"
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types';
import { standard } from './presets'
import { cn } from '$ui/utils'

export interface Props extends ControlProps {
  include_blank?: string | boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
  include_blank: false,
})

const emit = defineEmits<{
  change: [evenvt: Event]
}>()

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

provide('model_value', modelValue)

const options = helper.buildControlConfig(props)
const control_attrs = computed(() => {
  const attrs = { class: [] } as any

  if (options.value.size == 'small') {
    attrs.class.push('form-select-sm')
  } else if (options.value.size == 'large') {
    attrs.class.push('form-select-lg')
  }

  if (validation.value.state == 'invalid') {
    attrs.class.push("is-invalid")
  }

  if (presenterConfig.value.disabled) {
    attrs.disabled = true
  }

  if (options.value.control_id) {
      attrs.id = options.value.control_id
    }

  return attrs
})
</script>
