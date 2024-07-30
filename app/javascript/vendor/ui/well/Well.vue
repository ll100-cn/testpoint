<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'vue'
import { cn } from '$vendor/ui/utils'

const variance = cva('border rounded-md inline-flex items-center p-2 shadow-sm', {
  variants: {
    variant: {
      muted: "bg-muted/5",
      primary: "bg-primary/15",
      destructive: "bg-destructive/5",
    }
  },

  defaultVariants: {
    variant: 'muted'
  }
})

interface Props {
  class?: HTMLAttributes['class']
  variant?: VariantProps<typeof variance>['variant']
}

const props = withDefaults(defineProps<Props>(), {
})

</script>

<template>
  <div :class="cn(variance({ variant }), props.class)">
    <slot></slot>
  </div>
</template>
