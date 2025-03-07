<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { provideAlertPresenter, relayAlertPreseterConfig, useAlertPresenter, useAlertPresenters, type AlertPresenter, type AlertPresenterConfig } from './types'

const presenters = useAlertPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | AlertPresenter
}

const props = withDefaults(defineProps<Props & Partial<AlertPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayAlertPreseterConfig(props)
const presenter = provideAlertPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)" role="alert">
    <slot />
  </div>
</template>
