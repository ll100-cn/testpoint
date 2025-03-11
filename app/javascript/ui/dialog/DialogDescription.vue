<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'radix-vue'
import { cn } from '../utils'
import { relayDialogPresenterConfig, useDialogPresenter } from './types'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const presenterConfig = relayDialogPresenterConfig()
const presenter = useDialogPresenter()
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    :class="cn(presenter.description(presenterConfig), props.class)"
  >
    <slot />
  </DialogDescription>
</template>
