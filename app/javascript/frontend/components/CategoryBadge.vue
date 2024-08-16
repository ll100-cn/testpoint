<template>
  <Badge v-if="category" preset="standard" :style="`background-color: ${category.color}`">
    {{ category.name }}
    <template v-if="count">{{ count }}</template>
  </Badge>

  <Badge v-else style="background-color: #adb5bd;">
    未分配
    <template v-if="count">{{ count }}</template>
  </Badge>
</template>

<script setup lang="ts">
import { Category } from '@/models'
import { Badge } from '$vendor/ui'

const props = defineProps<{
  category?: Category
  count?: number
}>()

</script>
