<template>
  <SelectItem v-for="category in categories" :value="category.id">
    <i class="fas fa-circle" :style="{ color: category.color }"></i>
    {{ category.name }}
  </SelectItem>
</template>

<script setup lang="ts">
import { Category } from '@/models'
import { SelectItem } from '$ui/select'

const props = defineProps<{
  categories: Category[]
}>()

</script>
