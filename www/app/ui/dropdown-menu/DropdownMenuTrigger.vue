<script setup lang="ts">
import { cn } from '../utils'
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

const props = defineProps<DropdownMenuTriggerProps>()

const forwarded = useForwardProps(props)
const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuTrigger v-bind="forwarded" :class="cn(presenter.trigger(presenterConfig))" >
    <slot />
  </DropdownMenuTrigger>
</template>
