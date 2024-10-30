<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { provideAlertPresenter, relayAlertPreseterConfig, type AlertPresenter, type AlertPresenterConfig } from './types'
import * as AlertPresenters from './presets'

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof AlertPresenters | AlertPresenter
}

const props = withDefaults(defineProps<Props & Partial<AlertPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayAlertPreseterConfig(props)
const presenter = provideAlertPresenter(computed(() => {
  return typeof props.preset == 'string' ? AlertPresenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)" role="alert">
    <slot />
  </div>
</template>
