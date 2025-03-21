<!--
  SNIP: ed524a4e5c4819c66579868d8245d2de
  FILES:
   - ButtonProvider.vue
   - types.ts => Button-types.ts
   - index.ts => Button-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed, useAttrs, type HTMLAttributes, withDefaults } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '../utils'
import { provideButtonPresenter, relayButtonPresenterConfig, type ButtonPresenter, type ButtonPresenterConfig, useButtonPresenters, useButtonPresenter } from './types'
import type { RouteLocationRaw } from 'vue-router'

const presenters = useButtonPresenters()

interface Props extends PrimitiveProps {
  preset?: keyof typeof presenters | ButtonPresenter
  class?: HTMLAttributes['class']
  to?: string | RouteLocationRaw
  inherit?: boolean
}

const props = withDefaults(defineProps<Props & Partial<ButtonPresenterConfig>>(), {
  as: 'button',
  inherit: false,
  preset: 'standard',
  size: 'default',
})

const presenterConfig = relayButtonPresenterConfig(props)
const presenter = props.inherit ? useButtonPresenter() : provideButtonPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const attrs = useAttrs()
const as = computed(() => {
  if (attrs.disabled) {
    return 'button'
  }

  if (attrs.href) {
    return "a"
  }

  if (props.to) {
    return RouterLink
  }

  return props.as
})
</script>

<template>
  <Primitive :to="to" :as="as" :as-child="asChild" :class="cn(presenter.root(presenterConfig), props.class)" :data-shape="presenterConfig.shape" :data-size="presenterConfig.size">
    <slot></slot>
  </Primitive>
</template>
