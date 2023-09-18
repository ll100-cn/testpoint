<template>
  <select ref="el" v-model="model_value" :data-live-search="live_search" class="selectpicker form-control" v-bind="control_attrs" data-style-base="form-control">
    <option v-if="include_blank || include_blank == ''" value>{{ include_blank }}</option>
    <option v-for="item in collection" :key="item[valueMethod]" :value="item[valueMethod]">
      {{ item[labelMethod] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import 'bootstrap-select'
import $ from 'jquery'
import { nextTick, onMounted, ref } from "vue"
import * as helper from "../helper"
import { ControlProps } from '../helper'

interface Props extends ControlProps {
  validation?: Validation

  name?: string
  collection: Object
  labelMethod: string
  valueMethod: string
  include_blank?: string | boolean
  live_search?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  include_blank: true,
  live_search: false,
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlOptions(props)
const control_attrs = helper.buildControlAttrs(options, validation)

const el = ref(null! as HTMLElement)

onMounted(() => {
  nextTick(() => {
    ($(el.value) as any).selectpicker()
  })
})

</script>
