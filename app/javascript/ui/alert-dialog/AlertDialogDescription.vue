<script setup lang="ts">
import { AlertDialogDescription } from 'reka-ui'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '../utils'
import { relayAlertDialogPresenterConfig, useAlertDialogPresenter, type AlertDialogPresenter, type AlertDialogPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const presenterConfig = relayAlertDialogPresenterConfig()
const presenter = useAlertDialogPresenter()
</script>

<template>
  <AlertDialogDescription v-bind="delegatedProps" :class="cn(presenter.description(presenterConfig), props.class)">
    <slot />
  </AlertDialogDescription>
</template>
