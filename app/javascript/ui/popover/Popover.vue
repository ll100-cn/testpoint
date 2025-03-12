<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui'
import { providePopoverPresenter, relayPopoverPresenterConfig, type PopoverPresenter, type PopoverPresenterConfig, usePopoverPresenters } from './types'
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'

const presenters = usePopoverPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset: keyof typeof presenters | PopoverPresenter
}

const props = withDefaults(defineProps<Props & Partial<PopoverPresenterConfig>>(), {
  preset: "standard"
})

const emits = defineEmits<PopoverRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relayPopoverPresenterConfig(props)
const presenter = providePopoverPresenter(computed(() => {
  if (typeof props.preset != 'string') {
    return props.preset
  }

  return presenters[props.preset]
}))
</script>

<template>
  <PopoverRoot v-bind="forwarded">
    <slot />
  </PopoverRoot>
</template>
