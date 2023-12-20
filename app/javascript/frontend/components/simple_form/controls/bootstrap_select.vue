<template>
  <div class="form-control p-0" :class="{ 'disabled': options.disabled, 'is-invalid': validation.isInvaild() }">
    <select ref="el" v-model="model_value">
      <option v-if="include_blank !== false" value>{{ include_blank || "" }}</option>
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
import { Validation } from "@/models"
import $ from 'jquery'
import { nextTick, onMounted, provide, ref } from "vue"
import * as helper from "../helper"
import { ControlProps } from "../helper"

export interface Props extends ControlProps {
  validation?: Validation

  name?: string
  include_blank?: string | boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  include_blank: false,
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const el = ref(null as HTMLSelectElement)

provide('model_value', model_value)

const options = helper.buildControlConfig(props)
const validation = helper.validation(props)

onMounted(() => {
  nextTick(() => {
    const config = {
      liveSearch: true,
      styleBase: "btn border-0 bg-transparent",
      width: "100%",
      style: "",
      noneSelectedText: "请选择"
    }

    if (options.value.size == 'small') {
      config.styleBase += " btn-sm"
    } else if (options.value.size == 'large') {
      config.styleBase += " btn-lg"
    }

    if (options.value.disabled) {
      config.styleBase += " disabled"
    }

    const $el = $(el.value) as any
    $el.selectpicker(config)
  })
})

</script>
