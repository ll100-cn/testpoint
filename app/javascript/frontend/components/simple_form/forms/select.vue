<template>
  <select v-model="model_value" class="form-select" :class="[{'is-invalid': validation?.isInvaild()}, custom_class]" :disabled="disabled" @change="emit('change', $event)">
    <option v-if="include_blank !== false" value>{{ include_blank || "" }}</option>
    <template v-if="(collection instanceof Array)">
      <option v-for="item in collection" :key="item[valueMethod]" :value="item[valueMethod]">
        {{ item[labelMethod] }}
      </option>
    </template>
    <template v-else>
      <optgroup v-for="(list, key) in collection" :key="key" :label="key">
        <option v-for="item in list" :key="item[valueMethod]" :value="item[valueMethod]">
          {{ item[labelMethod] }}
        </option>
      </optgroup>
    </template>
  </select>
</template>

<script setup lang="ts">
import { Validation } from "@/models"
import * as helper from "./helper"

const props = withDefaults(defineProps<{
  modelValue?: any
  validation?: Validation

  name?: string
  disabled?: boolean
  collection: object
  labelMethod: string
  valueMethod: string
  include_blank?: string | boolean
  required?: boolean
  custom_class?: string
}>(), {
  disabled: false,
  include_blank: false,
  required: false,
})

const emit = defineEmits<{
  change: [evenvt: Event]
}>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)
</script>
