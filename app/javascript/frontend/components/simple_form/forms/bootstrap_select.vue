<template>
  <select
    ref="el"
    v-model="model_value"
    :data-live-search="live_search"
    class="selectpicker form-control"
    data-style-base="form-control"
    :class="[{'is-invalid': validation?.isInvaild()}, custom_class]"
    :disabled="disabled"
    @change="emit('change', $event)">
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
import * as helper from "./helper"

const props = withDefaults(defineProps<{
  validation?: Validation

  name?: string
  disabled?: boolean
  collection: Object
  labelMethod: string
  valueMethod: string
  includeBlank?: boolean
  include_blank?: string
  required?: boolean
  live_search?: boolean
  custom_class?: string
}>(), {
  disabled: false,
  includeBlank: false,
  required: false,
  live_search: false
})

const emit = defineEmits<{
  change: [evenvt: Event]
}>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const el = ref(null! as HTMLElement)

onMounted(() => {
  nextTick(() => {
    ($(el.value) as any).selectpicker()
  })
})

</script>
