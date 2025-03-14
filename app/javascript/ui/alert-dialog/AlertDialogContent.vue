<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  AlertDialogContent,
  type AlertDialogContentEmits,
  type AlertDialogContentProps,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../utils'
import { relayAlertDialogPresenterConfig, useAlertDialogPresenter } from './types'

const props = defineProps<AlertDialogContentProps & { class?: HTMLAttributes['class'] }>()

const presenterConfig = relayAlertDialogPresenterConfig()
const presenter = useAlertDialogPresenter()

const emits = defineEmits<AlertDialogContentEmits>()
const forwarded = useForwardPropsEmits(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}), emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay :class="cn(presenter.overlay(presenterConfig))" />
    <AlertDialogContent v-bind="forwarded" :class="cn(presenter.content(presenterConfig), props.class)">
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
