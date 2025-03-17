<!--
  SNIP: ed524a4e5c4819c66579868d8245d2de
  FILES:
   - types.ts => ButtonGroup-types.ts
   - index.ts => ButtonGroup-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)">
    <ButtonProvider v-bind="buttonPresenterConfig" :preset="preset">
      <slot></slot>
    </ButtonProvider>
  </div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { provideButtonGroupPresenter, relayButtonGroupPresenterConfig, useButtonGroupPresenters, type ButtonGroupPresenter, type ButtonGroupPresenterConfig } from './types'
import { provideButtonPresenter, relayButtonPresenterConfig, useButtonPresenters, type ButtonPresenter, type ButtonPresenterConfig } from '../button/types'
import { ButtonProvider } from '$ui/button'

const buttons = useButtonPresenters()
const presenters = useButtonGroupPresenters()

interface Props {
  class?: HTMLAttributes['class']
  group?: keyof typeof presenters | ButtonGroupPresenter
  preset?: keyof typeof buttons | ButtonPresenter
}

const props = withDefaults(defineProps<Props & Partial<ButtonGroupPresenterConfig> & Partial<ButtonPresenterConfig>>(), {
  group: 'standard',
  preset: 'standard',
})

const presenterConfig = relayButtonGroupPresenterConfig(props)
const presenter = provideButtonGroupPresenter(computed(() => {
  return typeof props.group == 'string' ? presenters[props.group] : props.group
}))

const buttonPresenterConfig = relayButtonPresenterConfig(props)
</script>
