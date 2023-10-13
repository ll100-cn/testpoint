<template>
  <select v-model="model_value" class="form-select" v-bind="control_attrs" @change="emit('change', $event)">
    <option v-if="include_blank !== false" value>{{ include_blank || "" }}</option>
    <slot />
  </select>
</template>

<script setup lang="ts">
import { Validation } from "@/models"
import * as helper from "../helper"
import { ControlProps } from "../helper"
import { computed, provide } from "vue"

export interface Props extends ControlProps {
  validation?: Validation

  name?: string
  include_blank?: string | boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  include_blank: false,
})

const emit = defineEmits<{
  change: [evenvt: Event]
}>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

provide('model_value', model_value)

const options = helper.buildControlConfig(props)
const control_attrs = computed(() => {
  const attrs = { class: [] } as any

  if (options.value.size == 'small') {
    attrs.class.push('form-select-sm')
  } else if (options.value.size == 'large') {
    attrs.class.push('form-select-lg')
  }

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
</script>
