<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuSeparator, useForwardProps, type DropdownMenuSeparatorProps, } from 'reka-ui'
import { cn } from '../utils'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

const props = defineProps<DropdownMenuSeparatorProps & {
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <DropdownMenuSeparator v-bind="forwarded" :class="cn(presenter.separator(presenterConfig), props.class)" />
</template>
