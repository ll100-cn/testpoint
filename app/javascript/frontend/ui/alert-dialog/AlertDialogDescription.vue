<script setup lang="ts">
import { cn } from '@/ui/utils'
import { AlertDialogDescription } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { relayAlertDialogPreseterConfig, useAlertDialogPresenter, type AlertDialogPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const presenterConfig = relayAlertDialogPreseterConfig(props)
const presenter = useAlertDialogPresenter()
</script>

<template>
  <AlertDialogDescription
    v-bind="delegatedProps"
    :class="cn(presenter.description(presenterConfig), props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>
