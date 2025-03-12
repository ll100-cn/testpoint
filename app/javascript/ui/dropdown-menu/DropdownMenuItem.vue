<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui'
import { cn } from '../utils'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

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
const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuItem v-bind="forwardedProps" :class="cn(presenter.item(presenterConfig), inset && 'pl-8', props.class)">
    <slot />
  </DropdownMenuItem>
</template>
