<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & AlertDialogActionProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps">
    <slot />
  </AlertDialogAction>
</template>
