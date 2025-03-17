<!--
  SNIP: ca0f84dbd46db17b68bb6558d749a0c7
-->
<template>
  <IconifyIcon v-bind="$attrs" :icon="icon" :customise="cleanStrokeWidth" />
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

defineProps<{
  icon: string
}>()

function cleanStrokeWidth(content: string, name: string, prefix: string, provider: string) {
  return content.replace(/stroke-width="[\d.]+"/g, '')
}
</script>
