<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label, type LabelProps } from 'radix-vue'
import { cn } from '$ui/utils'
import { cva, type VariantProps } from 'class-variance-authority'

type PresetId = 'fluid' | 'fixed'

const variance = cva('px-4', {
  variants: {
    preset: {
      fluid: '',
      fixed: 'mx-auto',
    } satisfies Record<PresetId, string>,
  },
  defaultVariants: {
    preset: 'fluid',
  }
})

interface Props {
  class?: HTMLAttributes['class']
  preset?: VariantProps<typeof variance>['preset']
}

const props = defineProps<Props>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <div v-bind="delegatedProps" :class="cn(variance({ preset }), props.class)">
    <slot></slot>
  </div>
</template>
