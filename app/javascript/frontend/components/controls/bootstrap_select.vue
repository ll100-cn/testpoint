<template>
  <div class="form-control p-0" :class="{ 'disabled': presenterConfig.disabled, 'is-invalid': validation.state == 'invalid' }">
    <select ref="el" v-model="modelValue">
      <option v-if="include_blank !== false" value>{{ include_blank || "" }}</option>
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
import { Validation } from "@/models";
import $ from 'jquery'
import { computed, nextTick, onMounted, provide, ref } from "vue"
import * as helper from "../simple_form/helper"
import { ControlProps } from "../simple_form/helper"
import { ControlConfig, FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types'

export interface Props extends ControlProps {
  include_blank?: string | boolean
}

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
  disabled: false,
  include_blank: false,
})

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

const el = ref(null as HTMLSelectElement)

provide('model_value', modelValue)

const options = helper.buildControlConfig(props)

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

    if (presenterConfig.value.disabled) {
      config.styleBase += " disabled"
    }

    const $el = $(el.value) as any
    $el.selectpicker(config)
  })
})

</script>
