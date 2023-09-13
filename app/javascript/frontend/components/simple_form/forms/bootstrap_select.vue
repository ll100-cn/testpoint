<template>
  <select
    ref="el"
    v-model="form[code]"
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

const el = ref(null! as HTMLElement)

onMounted(() => {
  nextTick(() => {
    ($(el.value) as any).selectpicker()
  })
})

</script>
