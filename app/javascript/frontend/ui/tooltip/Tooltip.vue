<script setup lang="ts">
import { TooltipRoot, type TooltipRootEmits, useForwardPropsEmits } from 'radix-vue'
import { provideTooltipPresenter, relayTooltipPreseterConfig, type TooltipPresenter, type TooltipPresenterConfig } from './types'
import * as TooltipPresenters from './presets'
import { computed, type HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof TooltipPresenters | TooltipPresenter
}

const props = withDefaults(defineProps<Props & Partial<TooltipPresenterConfig>>(), {
  preset: 'standard'
})

const emits = defineEmits<TooltipRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relayTooltipPreseterConfig(props)
const presenter = provideTooltipPresenter(computed(() => {
  return typeof props.preset == 'string' ? TooltipPresenters[props.preset] : props.preset
}))
</script>

<template>
  <TooltipRoot v-bind="forwarded">
    <slot />
  </TooltipRoot>
</template>
