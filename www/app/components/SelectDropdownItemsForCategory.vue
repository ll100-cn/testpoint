<template>
  <SelectdropItem v-for="category in categories" :value="category.id">
    <i class="fas fa-circle" :style="{ color: category.color }"></i>
    {{ category.name }}
  </SelectdropItem>
</template>

<script setup lang="ts">
import { Category } from '@/models'
import { SelectdropItem } from './controls/selectdrop'

const props = defineProps<{
  categories: Category[]
}>()

</script>
