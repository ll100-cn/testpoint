<template>
  <input v-model="model_value" class="form-control" :name="name" :disabled="disabled" :class="{'is-invalid': validation?.isInvaild() }">
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import * as helper from "./helper"

export interface Props {
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

</script>
