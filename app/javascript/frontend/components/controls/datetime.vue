<template>
  <ButtonGroup>
    <FlatPickr :model-value="local_value" v-bind="input_attrs" :class="cn(standard.input(presenterConfig), props.class)" @update:model-value="onUpdateModelValue" :config="config" />
    <Button preset="outline" variant="secondary" type="button" data-toggle>
      <i class="far fa-calendar"></i>
    </Button>
  </ButtonGroup>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import dayjs from 'dayjs'
import 'flatpickr/dist/flatpickr.css'
import { computed, ref, type HTMLAttributes } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import * as helper from "../simple_form/helper"
import { type ControlProps } from '../simple_form/helper'
import { type ControlConfig, type FormPresenterConfig, relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types'
import { standard } from './presets'
import { cn } from '$ui/utils'
import { Button } from '$ui/button'
import { ButtonGroup } from '$ui/button-group'

export interface Props extends ControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

const options = helper.buildControlConfig(props)
const input_group_attrs = computed(() => {
  const attrs = { class: [] } as any

  if (options.value.size == 'small') {
    attrs.class.push('input-group-sm')
  } else if (options.value.size == 'large') {
    attrs.class.push('input-group-lg')
  }

  return attrs
})

const input_attrs = computed(() => {
  const attrs = { class: [] } as any

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

const local_value = ref(modelValue.value)

const config = {
  time_24hr: true,
  enableTime: true,
  dateFormat: "Y-m-d H:i",
}

function onUpdateModelValue(new_value: string) {
  if (new_value == null) {
    modelValue.value = null
  } else {
    const current_datetime = dayjs(new_value).toDate()
    modelValue.value = current_datetime
  }
}
</script>
