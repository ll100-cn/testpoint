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

const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()

const extraAttrs = computed(() => {
  const result = {} as Record<string, any>

  if (props.inset) {
    result['data-inset'] = ''
  }

  return result
})

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <DropdownMenuItem v-bind="{ ...forwarded, ...extraAttrs }" :class="cn(presenter.item(presenterConfig), props.class)">
    <slot />
  </DropdownMenuItem>
</template>
