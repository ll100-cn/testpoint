<template>
  <input type="hidden" :value="model_value" />

  <div class="dropdown">
    <button type="button" class="btn btn-sm dropdown-toggle" :class="validation.isInvaild() ? 'btn-outline-danger' : 'btn-outline-secondary'" data-bs-toggle="dropdown">
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
import { Ref, computed, inject, provide, reactive } from 'vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
import * as helper from "./helper"

const emit = defineEmits<{
  change: [value: any]
}>()

interface Props {
  validation?: Validation

  disabled?: boolean
  include_blank?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  include_blank: true
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

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