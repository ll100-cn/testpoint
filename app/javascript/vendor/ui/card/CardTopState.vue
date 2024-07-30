<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
import { cn } from '$vendor/ui/utils'
import { relayCardPreseterConfig, useCardPresenter } from './types'
import { cva, type VariantProps } from 'class-variance-authority'

const variance = cva(`
    h-1 absolute top-0 w-full
    before:absolute before:size-full before:-translate-x-full before:bg-clip-content
    after:absolute after:size-full after:bg-clip-content
  `, {
  variants: {
    variant: {
      primary: 'bg-primary',
      tint: 'before:bg-[color:hsl(var(--color-tint))] after:bg-[color:hsl(var(--color-tint))]',
    }
  }
})

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: VariantProps<typeof variance>['variant']
}>()

const presenterConfig = relayCardPreseterConfig()
const presenter = useCardPresenter()
</script>

<template>
  <div :class="cn(presenter.rounded(presenterConfig), 'rounded-b-none', variance(presenterConfig), props.class)" class="">
  </div>
</template>
