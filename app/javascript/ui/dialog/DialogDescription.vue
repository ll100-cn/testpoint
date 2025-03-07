<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DialogDescription, useForwardProps } from 'radix-vue'
import { cn } from '$ui/utils'
import { relayDialogPreseterConfig, useDialogPresenter, type DialogPresenterConfig } from './types';

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
const presenterConfig = relayDialogPreseterConfig(props)
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
