<script setup lang="ts">
import { PaginationPrev, useForwardProps, type PaginationPrevProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<PaginationPrevProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <PaginationPrev v-bind="forwarded">
    <slot></slot>
  </PaginationPrev>
</template>
