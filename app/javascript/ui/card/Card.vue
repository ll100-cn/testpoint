<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { type CardPresenter, type CardPresenterConfig, relayCardPreseterConfig, provideCardPresenter, useCardPresenters } from './types'

const presenters = useCardPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | CardPresenter
}

const props = withDefaults(defineProps<Props & Partial<CardPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayCardPreseterConfig(props)
const presenter = provideCardPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.rounded(presenterConfig), presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
