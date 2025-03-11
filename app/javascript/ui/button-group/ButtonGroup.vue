<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { provideButtonGroupPresenter, relayButtonGroupPresenterConfig, useButtonGroupPresenters, type ButtonGroupPresenter, type ButtonGroupPresenterConfig } from './types'
import { provideButtonPresenter, relayButtonPresenterConfig, useButtonPresenters, type ButtonPresenter, type ButtonPresenterConfig } from '../button/types'

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

relayButtonPresenterConfig(props)
provideButtonPresenter(computed(() => {
  return typeof props.preset == 'string' ? buttons[props.preset] : props.preset
}))
</script>
