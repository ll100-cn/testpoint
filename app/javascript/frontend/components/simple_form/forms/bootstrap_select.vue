<template>
  <select ref="el" v-model="form[code]" class="selectpicker form-control" :class="{'is-invalid': validation?.isInvaild()}" :disabled="disabled" @change="emit('change', $event)">
    <option v-if="include_blank" :value="undefined">{{ include_blank }}</option>
    <option v-for="item in collection" :key="item[valueMethod]" :value="item[valueMethod]">
      {{ item[labelMethod] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
import $ from 'jquery'
import 'bootstrap-select'
// import 'bootstrap-select/dist/css/bootstrap-select.css'

import { Validation } from '@/models'

const props = withDefaults(defineProps<{
  label?: string
  code: string
  name?: string
  form: object
  validation?: Validation
  disabled?: boolean
  collection: Object
  labelMethod: string
  valueMethod: string
  includeBlank?: boolean
  include_blank?: string
  required?: boolean
}>(), {
  disabled: false,
  includeBlank: false,
  required: false,
})

const emit = defineEmits<{
  change: [evenvt: Event]
}>()

const el = ref<HTMLElement>()

onMounted(() => {
  nextTick(() => {
    ($(el.value) as any).selectpicker()
  })
})

</script>
