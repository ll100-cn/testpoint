<template>
  <input v-model="model_value" class="form-control" :name="name" :disabled="disabled" v-bind="control_attrs">
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import * as helper from "../helper"
import { ControlOptions, ControlProps } from '../helper'
import { Ref, computed, inject } from 'vue'

export interface Props extends ControlProps {
  validation?: Validation

  name?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlOptions(props)
const control_attrs = helper.buildControlAttrs(options, validation)
</script>
