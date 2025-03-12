<script setup lang="ts">
import { type AlertDialogEmits, AlertDialogRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { type AlertDialogPresenter, type AlertDialogPresenterConfig, provideAlertDialogPresenter, relayAlertDialogPresenterConfig, useAlertDialogPresenters } from './types'

const presenters = useAlertDialogPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | AlertDialogPresenter
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
  preset: 'standard',
})
const emits = defineEmits<AlertDialogEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relayAlertDialogPresenterConfig(props)
const presenter = provideAlertDialogPresenter(computed(() => {
  if (typeof props.preset != 'string') {
    return props.preset
  }

  return presenters[props.preset]
}))
</script>

<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot />
  </AlertDialogRoot>
</template>
