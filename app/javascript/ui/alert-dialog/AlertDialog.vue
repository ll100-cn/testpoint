<!--
  SNIP: ed524a4e5c4819c66579868d8245d2de
  FILES:
   - AlertDialogAction.vue
   - AlertDialogCancel.vue
   - AlertDialogContent.vue
   - AlertDialogDescription.vue
   - AlertDialogFooter.vue
   - AlertDialogHeader.vue
   - AlertDialogTitle.vue
   - AlertDialogTrigger.vue
   - types.ts => AlertDialog-types.ts
   - index.ts => AlertDialog-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
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

const presenterConfig = relayAlertDialogPresenterConfig(props)
const presenter = provideAlertDialogPresenter(computed(() =>
  typeof props.preset != 'string' ? props.preset : presenters[props.preset]
))

const emits = defineEmits<AlertDialogEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot />
  </AlertDialogRoot>
</template>
