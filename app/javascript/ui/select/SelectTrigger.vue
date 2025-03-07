<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, useForwardProps } from 'radix-vue'
import { CaretSortIcon } from '@radix-icons/vue'
import { cn } from '$ui/utils'
import { relaySelectPreseterConfig, useSelectPresenter, type SelectPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig>>(), {})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relaySelectPreseterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectTrigger v-bind="forwardedProps" :class="cn(presenter.trigger(presenterConfig), props.class)">
    <slot></slot>
    <SelectIcon as-child>
      <CaretSortIcon class="w-4 h-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
