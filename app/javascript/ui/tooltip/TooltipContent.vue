<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TooltipContent, type TooltipContentEmits, type TooltipContentProps, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../utils'
import { relayTooltipPresenterConfig, useTooltipPresenter, type TooltipPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
  sideOffset?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props & Partial<TooltipPresenterConfig>>(), {
  sideOffset: 4
})

const presenterConfig = relayTooltipPresenterConfig(props)
const presenter = useTooltipPresenter()

const emits = defineEmits<TooltipContentEmits>()
const forwarded = useForwardPropsEmits(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}), emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent v-bind="{ ...forwarded, ...$attrs }" :class="cn(presenter.content(presenterConfig), props.class)">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
