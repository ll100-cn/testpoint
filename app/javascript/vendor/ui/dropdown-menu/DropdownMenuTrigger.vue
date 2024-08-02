<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<DropdownMenuTriggerProps & Props>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger class="outline-none" v-bind="forwardedProps">
    <slot />
  </DropdownMenuTrigger>
</template>
