<template>
  <select ref="el" v-model="model_value" class="form-control" v-bind="control_attrs">
    <option v-if="include_blank_text != null" :value="undefined">{{ include_blank_text }}</option>
    <option v-for="item in collection" :key="item[valueMethod]" :value="item[valueMethod]">
      {{ item[labelMethod] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import 'bootstrap-select'
import $ from 'jquery'
import { computed, nextTick, onMounted, ref } from "vue"
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
  include_blank: true,
  live_search: false,
})

const el = ref(null! as HTMLElement)
const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlConfig(props)
const control_attrs = helper.buildControlAttrs(options, validation)

const include_blank_text = computed(() => {
  if (props.include_blank === false) {
    return null
  } else if (props.include_blank === true) {
    return ""
  } else {
    return props.include_blank
  }
})

onMounted(() => {
  nextTick(() => {
    ($(el.value) as any).selectpicker({
      liveSearch: true,
      styleBase: "form-control",
      noneSelectedText: "请选择"
    })
  })
})

</script>
