<!--
  SNIP: ed524a4e5c4819c66579868d8245d2de
  FILES:
   - types.ts => Badge-types.ts
   - index.ts => Badge-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
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
