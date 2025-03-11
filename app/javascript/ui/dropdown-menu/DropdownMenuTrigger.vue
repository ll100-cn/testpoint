<script setup lang="ts">
import { cn } from '../utils'
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'radix-vue'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

const props = defineProps<DropdownMenuTriggerProps>()

const forwardedProps = useForwardProps(props)
const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuTrigger
    class="outline-hidden"
    v-bind="forwardedProps"
    :class="cn(presenter.trigger(presenterConfig))"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
