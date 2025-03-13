<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogCancel, useForwardProps, type AlertDialogCancelProps } from 'reka-ui'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & AlertDialogCancelProps>()

const forwarded = useForwardProps(computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
}))
</script>

<template>
  <AlertDialogCancel v-bind="forwarded">
    <slot />
  </AlertDialogCancel>
</template>
