<script setup lang="ts">
import { TooltipProvider, TooltipRoot, type TooltipRootEmits, type TooltipRootProps, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { cn } from '../utils'
import { provideTooltipPresenter, relayTooltipPresenterConfig, useTooltipPresenters, type TooltipPresenter, type TooltipPresenterConfig } from './types'

const presenters = useTooltipPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | TooltipPresenter
}

const props = withDefaults(defineProps<Props & Partial<TooltipPresenterConfig>>(), {
  preset: 'standard',
})

const presenterConfig = relayTooltipPresenterConfig(props)
const presenter = provideTooltipPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const emits = defineEmits<TooltipRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipProvider>
    <TooltipRoot v-bind="forwarded">
      <slot />
    </TooltipRoot>
  </TooltipProvider>
</template>
