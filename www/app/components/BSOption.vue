<template>
  <option :value="value" :data-content="content_html" />
</template>

<script setup lang="ts">
import { render, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps<{
  value: number | string
}>()

const nodes = slots.default()
const content_html = nodes.map((node) => {
  const root = document.createElement('div')
  render(node, root)
  return root.innerHTML
}).join('')

</script>