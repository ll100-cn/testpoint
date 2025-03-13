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

const presenterConfig = relayDialogPresenterConfig(props)
const presenter = useDialogPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <DialogTitle v-bind="forwarded" :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </DialogTitle>
</template>
