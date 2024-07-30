<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { RadioGroupIndicator, RadioGroupItem, type RadioGroupItemProps, useForwardProps } from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '../utils'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem v-bind="forwardedProps" :class="cn(`
    size-4 inline-block overflow-hidden align-middle
    rounded-full border border-primary text-primary shadow
    focus:outline-none focus-visible:ring-1 focus-visible:ring-ring
    disabled:cursor-not-allowed disabled:opacity-50
  `, props.class)">
    <RadioGroupIndicator class="flex items-center justify-center">
      <CheckIcon class="size-3.5 fill-primary" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
