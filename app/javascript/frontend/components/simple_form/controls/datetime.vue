<template>
  <div class="input-group" v-bind="input_group_attrs">
    <FlatPickr :model-value="local_value" v-bind="input_attrs" @update:model-value="onUpdateModelValue" class="form-control" :config="config" />
    <button class="btn btn-outline-secondary" type="button" data-toggle>
      <i class="far fa-calendar"></i>
      <span aria-hidden="true" class="sr-only">Toggle</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import dayjs from 'dayjs'
import 'flatpickr/dist/flatpickr.css'
import { computed, ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import * as helper from "../helper"
import { ControlProps } from '../helper'

export interface Props extends ControlProps {
  validation?: Validation

  name?: string
}

const props = defineProps<Props>()

const define_model_value = defineModel<any>({ local: true })
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

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

  if (validation.value.isInvaild()) {
    attrs.class.push("is-invalid")
  }

  if (options.value.disabled) {
    attrs.disabled = true
  }

  if (options.value.control_id) {
    attrs.id = options.value.control_id
  }

  return attrs
})

const local_value = ref(model_value.value)

const config = {
  time_24hr: true,
  enableTime: true,
  dateFormat: "Y-m-d H:i",
}

function onUpdateModelValue(new_value) {
  if (new_value == null) {
    model_value.value = null
  } else {
    const current_datetime = dayjs(new_value).toDate()
    model_value.value = current_datetime
  }
}
</script>
