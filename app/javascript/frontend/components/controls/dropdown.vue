<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button type="button" class="btn" v-bind="control_attrs">
        <template v-if="selected_item">
          <component v-for="child in selected_item.children" :is="child" />
        </template>
        <template v-else>
          <span v-if="include_blank !== false">{{ include_blank === true ? "任意" : include_blank }}</span>
        </template>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <a href="#" class="dropdown-item" :class="{ 'active': modelValue == null }" v-if="include_blank !== false" @click.prevent="onBlankClick">
        {{ include_blank === true ? "任意" : include_blank }}
      </a>
      <slot v-bind="{ Component: DropdownMenuItemVue }"></slot>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { type InputHTMLAttributes, computed, provide, reactive } from 'vue'
import * as helper from "../simple_form/helper"
import { type ControlProps } from '../simple_form/helper'
import { default as DropdownMenuItemVue } from './DropdownMenuItem.vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui'
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '@/ui/simple_form/types';

interface Props extends ControlProps {
  include_blank?: boolean | string
}

const props = withDefaults(defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>(), {
  disabled: false,
  include_blank: true
})

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

const options = helper.buildControlConfig(props)
const control_attrs = computed(() => {
  const attrs = <InputHTMLAttributes>{ class: [] }

  if (presenterConfig.value.size == 'sm') {
    attrs.class.push('btn-sm')
  }

  if (presenterConfig.value.size == 'lg') {
    attrs.class.push('btn-lg')
  }

  if (validation.value.state == 'invalid') {
    attrs.class.push("btn-outline-danger")
  } else {
    attrs.class.push("btn-outline-secondary")
  }

  if (presenterConfig.value.disabled) {
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

provide("model_value", modelValue)

const selected_item = computed(() => {
  const value = modelValue.value
  const children = mapping.get(value)
  if (!children) {
    return null
  }

  return { value, children }
})

function onBlankClick() {
  modelValue.value = null
}

</script>