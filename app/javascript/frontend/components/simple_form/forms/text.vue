<template>
  <textarea v-model="model_value" class="form-control" :name="name" :disabled="disabled" :class="{'is-invalid': validation?.isInvaild() }" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { PropType } from 'vue'
import * as helper from "./helper"

const props = defineProps({
  validation: { type: Object as PropType<Validation>, required: false },

  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)
</script>
