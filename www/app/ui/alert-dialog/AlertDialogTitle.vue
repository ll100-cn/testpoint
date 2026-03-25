<script setup lang="ts">
import { AlertDialogTitle, useForwardProps } from 'reka-ui'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '../utils'
import { type AlertDialogPresenter, type AlertDialogPresenterConfig, relayAlertDialogPresenterConfig, useAlertDialogPresenter } from './types'

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
  <AlertDialogTitle v-bind="forwarded" :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </AlertDialogTitle>
</template>
