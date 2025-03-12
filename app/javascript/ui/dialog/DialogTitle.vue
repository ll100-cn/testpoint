<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui'
import { cn } from '../utils'
import { relayDialogPresenterConfig, useDialogPresenter, type DialogPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relayDialogPresenterConfig(props)
const presenter = useDialogPresenter()
</script>

<template>
  <DialogTitle v-bind="forwardedProps" :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </DialogTitle>
</template>
