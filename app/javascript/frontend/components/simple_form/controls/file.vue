<template>
  <input @change="onInputChanged" type="file" class="form-control" :name="name" v-bind="{ ...control_attrs, multiple }">
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import * as helper from "../helper"
import { ControlProps } from '../helper'
import { InputHTMLAttributes } from 'vue'

export interface Props extends ControlProps, /* @vue-ignore */ Partial<InputHTMLAttributes> {
  validation?: Validation

  multiple?: boolean
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlConfig(props)
const control_attrs = helper.buildControlAttrs(options, validation)

function onInputChanged(event: Event) {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files ?? [])

  model_value.value = props.multiple ? files : files[0]
}
</script>
