<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'radix-vue'
import { cn } from '$vendor/ui/utils'

interface Props extends /* @vue-ignore */ DropdownMenuLabelProps {
  class?: HTMLAttributes['class']
  inset?: boolean
  preset?: 'default' | 'plain'
}

const props = withDefaults(defineProps<Props>(), {
  preset: 'default',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuLabel v-bind="forwardedProps" :class="cn('px-2 py-1.5 text-sm', props.preset == 'default' && 'font-semibold', inset && 'pl-8', props.class)">
    <slot />
  </DropdownMenuLabel>
</template>
