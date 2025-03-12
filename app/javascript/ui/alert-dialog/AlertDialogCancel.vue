<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogCancel, type AlertDialogCancelProps } from 'reka-ui'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & AlertDialogCancelProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogCancel v-bind="delegatedProps">
    <slot />
  </AlertDialogCancel>
</template>
