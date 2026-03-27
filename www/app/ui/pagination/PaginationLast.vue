<script setup lang="ts">
import { PaginationLast, useForwardProps, type PaginationLastProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const forwarded = useForwardProps(computed(() => {
  const { class: _,...delegated } = props
  return delegated
}))
</script>

<template>
  <PaginationLast v-bind="forwarded">
    <slot></slot>
  </PaginationLast>
</template>
