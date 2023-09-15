<template>
  <div class="pt-2">
    <input type="hidden" :name="name" value="" :disabled="disabled">
    <div v-for="item in collection" class="form-check form-check-inline">
      <input v-model="model_value" class="form-check-input" type="checkbox" :value="item[valueMethod]" :name="name" :disabled="disabled">
      <label class="form-check-label">{{ item[labelMethod] }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { PropType } from 'vue'
import * as helper from "../helper"

const props = defineProps({
  validation: { type: Object as PropType<Validation>, required: false },

  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  collection: { type: Array, required: true },
  labelMethod: { type: String, required: true },
  valueMethod: { type: String, required: true },
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

</script>
