<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps, useForwardProps } from 'reka-ui'
import { cn } from '../utils'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'
import { Icon } from '../input'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>()

const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <DropdownMenuSubTrigger v-bind="forwarded" :class="cn(presenter.subTrigger(presenterConfig), props.class)" >
    <slot />
    <span data-part-indicator>
      <Icon icon="ci:chevron-right" />
    </span>
  </DropdownMenuSubTrigger>
</template>
