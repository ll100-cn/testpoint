<template>
  <a href="#">
    <slot /> {{ order_text }}
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  sorts: string
  code: string
}>()

const order_text = computed(() => {
  const sort_data = (props.sorts ?? "").split(" ")
  if (sort_data[0] == props.code) {
    return sort_data[1] == "asc" ? "▲" : "▼"
  }
  return ""
})

</script>