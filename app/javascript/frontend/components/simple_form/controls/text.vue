<template>
  <textarea v-model="model_value" class="form-control" :name="name" v-bind="control_attrs" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import * as helper from "../helper"
import { type ControlProps } from '../helper'

interface Props extends ControlProps {
  validation?: Validation
  name?: string
}

const props = defineProps<Props>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlConfig(props)
const control_attrs = helper.buildControlAttrs(options, validation)
</script>
