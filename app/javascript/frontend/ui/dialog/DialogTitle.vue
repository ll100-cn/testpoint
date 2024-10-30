<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { DialogTitle, type DialogTitleProps, useForwardProps } from 'radix-vue'
import { cn } from '@/ui/utils'
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
  <DialogTitle v-bind="forwardedProps" :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </DialogTitle>
</template>
