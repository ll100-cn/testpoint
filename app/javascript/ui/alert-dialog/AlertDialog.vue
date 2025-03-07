<script setup lang="ts">
import { AlertDialogRoot, useForwardPropsEmits, type AlertDialogEmits, type AlertDialogProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { provideAlertDialogPresenter, relayAlertDialogPreseterConfig, type AlertDialogPresenterConfig, type AlertDialogPresenter, useAlertDialogPresenters } from './types'

const presenters = useAlertDialogPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | AlertDialogPresenter
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayAlertDialogPreseterConfig(props)
const presenter = provideAlertDialogPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const emits = defineEmits<AlertDialogEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot />
  </AlertDialogRoot>
</template>
