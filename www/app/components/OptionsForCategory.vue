<template>
  <option v-for="category in available_categories" :value="category.id">{{ category.name }}</option>
</template>

<script setup lang="ts">
import { useControlValue } from '$ui/simple_form';
import { Category } from '@/models'
import { computed, inject, type Ref } from 'vue'

const props = defineProps<{
  collection: Category[]
}>()

const model_value = useControlValue<number | null>()

const available_categories = computed(() => {
  return props.collection.filter(it => {

    if (it.id == model_value.value) {
      return true
    }

    return true
  })
})
</script>