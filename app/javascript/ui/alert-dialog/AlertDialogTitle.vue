<script setup lang="ts">
import { AlertDialogTitle } from 'radix-vue'
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '../utils'
import { type AlertDialogPresenter, type AlertDialogPresenterConfig, relayAlertDialogPresenterConfig, useAlertDialogPresenter } from './types'

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
  <AlertDialogTitle
    v-bind="delegatedProps"
    :class="cn(presenter.title(presenterConfig), props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
