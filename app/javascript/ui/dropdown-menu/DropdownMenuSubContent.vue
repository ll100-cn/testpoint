<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DropdownMenuSubContent, type DropdownMenuSubContentEmits, type DropdownMenuSubContentProps, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../utils'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>()

const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()

const emits = defineEmits<DropdownMenuSubContentEmits>()
const forwarded = useForwardPropsEmits(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}), emits)
</script>

<template>
  <DropdownMenuSubContent v-bind="forwarded" :class="cn(presenter.subContent(presenterConfig), props.class)">
    <slot />
  </DropdownMenuSubContent>
</template>
