<script setup lang="ts">
import { AlertDialogDescription, useForwardProps } from 'reka-ui'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '../utils'
import { relayAlertDialogPresenterConfig, useAlertDialogPresenter, type AlertDialogPresenter, type AlertDialogPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
})

const presenterConfig = relayAlertDialogPresenterConfig()
const presenter = useAlertDialogPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
}))
</script>

<template>
  <AlertDialogDescription v-bind="forwarded" :class="cn(presenter.description(presenterConfig), props.class)">
    <slot />
  </AlertDialogDescription>
</template>
