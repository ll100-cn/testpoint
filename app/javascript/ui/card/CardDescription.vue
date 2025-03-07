<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p :class="cn('text-sm text-muted', props.class)">
    <slot></slot>
  </p>
</template>
