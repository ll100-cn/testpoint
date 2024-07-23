<template>
  <input type="radio" v-bind="forwardedProps" v-model="modelValue" :class="cn(`

  `, props.class)" />
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { useForwardProps } from 'radix-vue'
import { cn } from '../utils'

interface Props {
  value: string | number
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const modelValue = defineModel<string | number | null>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

