<template>
  <Checkbox v-model:checked="modelValue" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import _ from 'lodash'
import { Checkbox, InputCheckbox } from '$ui/checkbox'

const props = defineProps<{
  collection: number[]
}>()

const rawValue = defineModel<number[]>({ required: true })

const modelValue = computed({
  get: () => {
    if (isIndeterminate.value) {
      return 'indeterminate'
    }

    return _.difference(props.collection, rawValue.value).length == 0
  },
  set: (value: boolean) => {
    if (value) {
      rawValue.value = props.collection
    } else {
      rawValue.value = []
    }
  }
})

const isIndeterminate = computed(() => {
  return rawValue.value.length > 0 && _.difference(props.collection, rawValue.value).length > 0
})
</script>
