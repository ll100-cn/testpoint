<template>
  <Checkbox v-model:checked="checked" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from './Checkbox.vue'

const props = defineProps<{
  value?: any
}>()

const modelValue = defineModel<any[]>({ default: () => [] })

const checked = computed({
  get: () => modelValue.value.includes(props.value),
  set: (value: boolean) => {
    if (value) {
      modelValue.value?.push(props.value)
    } else {
      modelValue.value = modelValue.value.filter((v) => v !== props.value)
    }
  },
})
</script>
