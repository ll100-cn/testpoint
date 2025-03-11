<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import type { SelectRootEmits, SelectRootProps } from 'reka-ui'
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../utils'
import { provideSelectPresenter, relaySelectPresenterConfig, type SelectPresenter, type SelectPresenterConfig, useSelectPresenters } from './types'

const presenters = useSelectPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset: keyof typeof presenters | SelectPresenter
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig>>(), {
  preset: 'standard'
})
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relaySelectPresenterConfig(props)
const presenter = provideSelectPresenter(computed(() => {
  if (typeof props.preset != 'string') {
    return props.preset
  }

  return presenters[props.preset]
}))
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
