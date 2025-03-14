<script setup lang="ts">
import { computed, withDefaults, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { provideBadgePresenter, relayBadgePresenterConfig, useBadgePresenters, type BadgePresenter, type BadgePresenterConfig } from './types'

const presenters = useBadgePresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | BadgePresenter
}

const props = withDefaults(defineProps<Props & Partial<BadgePresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayBadgePresenterConfig(props)
const presenter = provideBadgePresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)" :data-shape="presenterConfig.shape">
    <slot></slot>
  </div>
</template>
