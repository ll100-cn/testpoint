<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'radix-vue'
import { cn } from '@/ui/utils'
import { relayDropdownMenuPreseterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props extends /* @vue-ignore */ DropdownMenuLabelProps {
  class?: HTMLAttributes['class']
  inset?: boolean
  preset?: 'default' | 'plain'
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {
  preset: 'default',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuLabel v-bind="forwardedProps" :class="cn(presenter.label(presenterConfig), props.preset == 'default' && 'font-semibold', inset && 'pl-8', props.class)">
    <slot />
  </DropdownMenuLabel>
</template>
