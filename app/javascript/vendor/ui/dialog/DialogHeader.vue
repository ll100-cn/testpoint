<script setup lang="ts">
import { useSlots, type HTMLAttributes } from 'vue'
import { cn } from '$vendor/ui/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const slots = useSlots()
</script>

<template>
  <div :class="cn('flex gap-y-1.5 text-center sm:text-left items-center', props.class)">
    <slot />

    <template v-if="slots.actions">
      <div class="ms-auto"><slot name="actions"></slot></div>
    </template>
  </div>
</template>
