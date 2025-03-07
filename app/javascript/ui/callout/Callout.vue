<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { provideCalloutPresenter, relayCalloutPreseterConfig, useCalloutPresenters, type CalloutPresenter, type CalloutPresenterConfig } from './types'

const presenters = useCalloutPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | CalloutPresenter
}

const props = withDefaults(defineProps<Props & Partial<CalloutPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayCalloutPreseterConfig(props)
const presenter = provideCalloutPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)">
    <slot />
  </div>
</template>
