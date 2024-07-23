<script setup lang="ts">
import { type HTMLAttributes, computed, useAttrs } from 'vue'
import { PaginationNext, type PaginationNextProps } from 'radix-vue'
import { ChevronRightIcon } from '@radix-icons/vue'
import { Button, } from '../button'
import { cn } from '$vendor/ui/utils'

const props = withDefaults(defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

</script>

<template>
  <PaginationNext v-bind="delegatedProps">
    <slot></slot>
  </PaginationNext>
</template>
