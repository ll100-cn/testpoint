<template>
  <span v-if="category" class="badge" :style="`background-color: ${category.color}`">
    {{ category.name }}
    <template v-if="count">{{ count }}</template>
  </span>
  <span v-else class="badge" style="background-color: #212529;">
    未分配
    <template v-if="count">{{ count }}</template>
  </span>
</template>

<script setup lang="ts">
import { Category } from '@/models'

const props = defineProps<{
  category?: Category
  count?: number
}>()

</script>
