<template>
  <option v-for="category in available_categories" :value="category.id">{{ category.name }}</option>
</template>

<script setup lang="ts">
import { Category } from '@/models'
import { Ref, computed, inject } from 'vue'

const props = defineProps<{
  collection: Category[]
}>()

const model_value = inject('model_value') as Ref<number | null>

const available_categories = computed(() => {
  return props.collection.filter(it => {

    if (it.id == model_value.value) {
      return true
    }

    return true
  })
})
</script>