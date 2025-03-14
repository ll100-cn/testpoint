<script setup lang="ts">
import { PaginationNext, useForwardProps, type PaginationNextProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <PaginationNext v-bind="forwarded">
    <slot></slot>
  </PaginationNext>
</template>
