<script setup lang="ts">
import { cn } from '$ui/utils'
import { computed, type HTMLAttributes } from 'vue'
import { provideBadgePresenter, relayBadgePreseterConfig, useBadgePresenters, type BadgePresenter, type BadgePresenterConfig } from './types'

const presenters = useBadgePresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | BadgePresenter
}

const props = withDefaults(defineProps<Props & Partial<BadgePresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayBadgePreseterConfig(props)
const presenter = provideBadgePresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
