<template>
  <div class="dropdown">
    <input type="hidden" :value="model_value" />
    <button type="button" class="btn dropdown-toggle" v-bind="control_attrs" data-bs-toggle="dropdown">
      <template v-if="selected_item">
        <component v-for="child in selected_item.children" :is="child" />
      </template>
      <template v-else>
        <span v-if="include_blank !== false">{{ include_blank === true ? "任意" : include_blank }}</span>
      </template>
    </button>
    <div class="dropdown-menu">
      <a href="#" class="dropdown-item" :class="{ 'active': model_value == null }" v-if="include_blank !== false" @click.prevent="onBlankClick">
        {{ include_blank === true ? "任意" : include_blank }}
      </a>
      <slot v-bind="{ Component: DropdownMenuItem }"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { InputHTMLAttributes, computed, provide, reactive } from 'vue'
import * as helper from "../helper"
import { ControlProps } from '../helper'
import DropdownMenuItem from './DropdownMenuItem.vue'

interface Props extends ControlProps {
  validation?: Validation

  include_blank?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  include_blank: true
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlConfig(props)
const control_attrs = computed(() => {
  const attrs = <InputHTMLAttributes>{ class: [] }

  if (options.value.size == 'small') {
    attrs.class.push('btn-sm')
  }

  if (options.value.size == 'large') {
    attrs.class.push('btn-lg')
  }

  if (validation.value.isInvaild()) {
    attrs.class.push("btn-outline-danger")
  } else {
    attrs.class.push("btn-outline-secondary")
  }

  if (options.value.disabled) {
    attrs.disabled = true
  }

  if (options.value.control_id) {
    attrs.id = options.value.control_id
  }

  if (options.value.input_class) {
    attrs.class = attrs.class.concat(options.value.input_class)
  }

  return attrs as any
})

const mapping = reactive(new Map<any, any[]>())

function register(value, children) {
  mapping.set(value, children)
}
provide("register", register)

provide("model_value", model_value)

const selected_item = computed(() => {
  const value = model_value.value
  const children = mapping.get(value)
  if (!children) {
    return null
  }

  return { value, children }
})

function onBlankClick() {
  model_value.value = null
}

</script>