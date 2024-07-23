<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'
import { cn } from '$vendor/ui/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<ProgressRootProps & Props>(), {
  modelValue: 0,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <ProgressRoot v-bind="delegatedProps" :class="cn('relative h-2 w-full overflow-hidden rounded-full', props.class)">
    <div class="bg-current opacity-20 absolute inset-0"></div>
    <ProgressIndicator class="size-full flex-1 bg-current transition-all" :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`" />
  </ProgressRoot>
</template>
