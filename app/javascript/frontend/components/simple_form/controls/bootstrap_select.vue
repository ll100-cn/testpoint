<template>
  <div class="form-control p-0">
    <select ref="el" v-model="model_value" v-bind="control_attrs" @change="emit('change', $event)">
      <option v-if="include_blank !== false" value>{{ include_blank || "" }}</option>
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
import { Validation } from "@/models"
import * as helper from "../helper"
import { ControlProps } from "../helper"
import { computed, onMounted, provide, ref } from "vue"
import $ from 'jquery'

export interface Props extends ControlProps {
  validation?: Validation

  name?: string
  include_blank?: string | boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  include_blank: false,
  required: false,
})

const emit = defineEmits<{
  change: [evenvt: Event]
}>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const el = ref(null as HTMLSelectElement)

provide('model_value', model_value)

const control_attrs = computed(() => {
  const attrs = { class: [] } as any
  return attrs
})

onMounted(() => {
  setTimeout(() => {
    ($(el.value) as any).selectpicker({
      liveSearch: true,
      styleBase: "btn border-0 bg-transparent",
      width: "100%",
      style: "",
      noneSelectedText: "请选择"
    })
  }, 0);
})

</script>
