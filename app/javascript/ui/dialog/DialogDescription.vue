<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui'
import { cn } from '../utils'
import { relayDialogPresenterConfig, useDialogPresenter } from './types'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const presenterConfig = relayDialogPresenterConfig()
const presenter = useDialogPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <DialogDescription v-bind="forwarded" :class="cn(presenter.description(presenterConfig), props.class)">
    <slot />
  </DialogDescription>
</template>
