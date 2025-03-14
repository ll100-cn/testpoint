<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { cn } from '../utils'
import { provideDetailsPresenter, relayDetailsPresenterConfig, type DetailsPresenter, type DetailsPresenterConfig, useDetailsPresenters } from './types'
import { useForwardProps } from 'reka-ui'

const presenters = useDetailsPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset: keyof typeof presenters | DetailsPresenter
}

const props = withDefaults(defineProps<Props & Partial<DetailsPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayDetailsPresenterConfig(props)
const presenter = provideDetailsPresenter(computed(() =>
  typeof props.preset !== 'string' ? props.preset : presenters[props.preset]
))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)" style="--color-tint: var(--primary)">
    <slot></slot>
  </div>
</template>
