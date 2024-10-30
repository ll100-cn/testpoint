<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { type CardPresenter, type CardPresenterConfig, relayCardPreseterConfig, provideCardPresenter } from './types'
import * as CardPresenters from './presets'

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof CardPresenters | CardPresenter
}

const props = withDefaults(defineProps<Props & Partial<CardPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayCardPreseterConfig(props)
const presenter = provideCardPresenter(computed(() => {
  return typeof props.preset == 'string' ? CardPresenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.rounded(presenterConfig), presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
