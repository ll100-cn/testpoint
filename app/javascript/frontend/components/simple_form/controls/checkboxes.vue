<template>
  <div class="pt-2">
    <input type="hidden" :name="name" value="" :disabled="options.disabled">
    <div v-for="item in collection" class="form-check form-check-inline">
      <input v-model="model_value" class="form-check-input" type="checkbox" :value="item[valueMethod]" :name="name" v-bind="control_attrs">
      <label class="form-check-label">{{ item[labelMethod] }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { type PropType } from 'vue'
import * as helper from "../helper"
import { type ControlProps } from '../helper'

interface Props extends ControlProps {
  validation?: Validation

  name?: string
  collection: Object
  labelMethod: string
  valueMethod: string
}

const props = defineProps<Props>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlConfig(props)
const control_attrs = helper.buildControlAttrs(options, validation)
</script>
