<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'reka-ui'
import { cn } from '../utils'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props extends /* @vue-ignore */ DropdownMenuLabelProps {
  class?: HTMLAttributes['class']
  inset?: boolean
  role?: 'default' | 'plain'
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {
  role: 'default',
})
const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()

const extraAttrs = computed(() => {
  const result = {} as Record<string, any>

  result[`data-role-${props.role}`] = ''

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
  <DropdownMenuLabel v-bind="{ ...forwarded, ...extraAttrs }" :class="cn(presenter.label(presenterConfig), props.class)">
    <slot />
  </DropdownMenuLabel>
</template>
