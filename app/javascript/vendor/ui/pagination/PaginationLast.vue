<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationLast, type PaginationLastProps } from 'radix-vue'
import { DoubleArrowRightIcon } from '@radix-icons/vue'
import { Button } from '../button'
import { cn } from '$vendor/ui/utils'

const props = withDefaults(defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <slot></slot>
  </PaginationLast>
</template>
