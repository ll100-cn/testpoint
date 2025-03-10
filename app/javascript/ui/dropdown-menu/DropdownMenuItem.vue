<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuItem, useForwardProps } from 'radix-vue'
import { cn } from '$ui/utils'
import { relayDropdownMenuPreseterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuItem v-bind="forwardedProps" :class="cn(presenter.item(presenterConfig), inset && 'pl-8', props.class)">
    <slot />
  </DropdownMenuItem>
</template>
