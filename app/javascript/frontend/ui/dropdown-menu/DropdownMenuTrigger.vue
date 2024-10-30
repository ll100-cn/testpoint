<script setup lang="ts">
import { DropdownMenuTrigger, useForwardProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { relayDropdownMenuPreseterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {})

const forwardedProps = useForwardProps(props)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuTrigger
    :class="cn(presenter.trigger(presenterConfig), props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
