<template>
  <input type="hidden" :value="model_value" :name="code" />

  <div class="dropdown">
    <button type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
      <template v-if="selected_item">
        <component v-for="child in selected_item.children" :is="child" />
      </template>
      <template v-else>
        <span v-if="include_blank !== false">{{ include_blank === true ? "任意" : include_blank }}</span>
      </template>
    </button>
    <div class="dropdown-menu">
      <a href="#" class="dropdown-item" :class="{ 'active': model_value == null }" v-if="include_blank !== false">{{ include_blank === true ? "任意" : include_blank }}</a>
      <slot v-bind="{ Component: DropdownMenuItem }"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, provide, ref } from 'vue'
import DropdownMenuItem from './DropdownMenuItem.vue'

const emit = defineEmits<{
  change: [value: any]
}>()

interface Props {
  code: string
  form: any
  validation: Validation
  disabled?: boolean
  include_blank?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  include_blank: true
})

const mapping = ref(new Map<any, any[]>())

function register(value, children) {
  mapping.value.set(value, children)
}

provide("register", register)

const selected_item = computed(() => {
  const value = props.form[props.code]
  const children = mapping.value.get(value)
  if (!children) {
    return null
  }

  return { value, children }
})

const model_value = computed({
  get: () => {
    return props.form[props.code]
  },

  set: (new_value) => {
    props.form[props.code] = new_value
    emit("change", new_value)
  }
})

provide("model_value", model_value)

</script>