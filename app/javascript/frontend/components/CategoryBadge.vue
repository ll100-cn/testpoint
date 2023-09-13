<template>
  <span v-if="category" class="badge" :style="`background-color: ${category.color}`">
    {{ category.name }}
  </span>
  <span v-else>
    无
  </span>
</template>

<script setup lang="ts">
import { Category } from '@/models'

const props = defineProps<{
  category: Category
}>()

</script>
