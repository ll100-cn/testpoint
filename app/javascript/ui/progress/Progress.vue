<script setup lang="ts">
import { ProgressIndicator, ProgressRoot, useForwardProps } from 'reka-ui'
import { cn } from '$ui/utils'
import { provideProgressPresenter, relayProgressPresenterConfig, type ProgressPresenter, type ProgressPresenterConfig, useProgressPresenters } from './types'
import { computed, type HTMLAttributes } from 'vue'

const presenters = useProgressPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | ProgressPresenter
  modelValue: number
}

const props = withDefaults(defineProps<Props & Partial<ProgressPresenterConfig>>(), {
  modelValue: 0,
  preset: 'standard'
})

const presenterConfig = relayProgressPresenterConfig(props)
const presenter = provideProgressPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const forwarded = useForwardProps(computed(() => {
  const { class: _,...delegated } = props
  return delegated
}))
</script>

<template>
  <ProgressRoot v-bind="forwarded" :class="cn(presenter.root(presenterConfig), props.class)">
    <ProgressIndicator :class="presenter.indicator(presenterConfig)" :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`" />
  </ProgressRoot>
</template>
