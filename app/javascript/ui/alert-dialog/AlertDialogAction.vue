<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogAction, useForwardProps, type AlertDialogActionProps } from 'reka-ui'
import { cn } from '../utils'

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
}))
</script>

<template>
  <AlertDialogAction v-bind="forwarded" :class="cn(props.class)">
    <slot />
  </AlertDialogAction>
</template>
