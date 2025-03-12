<template>
  <CheckboxRaw v-model="checked" />
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue'
import CheckboxRaw from './CheckboxRaw.vue'

const props = defineProps<{
  value: T
}>()

const modelValue = defineModel<T[]>({ default: () => [] })

const checked = computed({
  get: () => modelValue.value.includes(props.value),
  set: (value: boolean) => {
    if (value) {
      modelValue.value = [ ...modelValue.value, props.value ]
    } else {
      modelValue.value = modelValue.value.filter((v) => v !== props.value)
    }
  },
})
</script>
