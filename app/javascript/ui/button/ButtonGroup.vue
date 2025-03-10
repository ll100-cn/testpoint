<template>
  <div :class="cn(`
    flex [&>*:not(:last-child)]:rounded-e-none [&>*:not(:last-child)]:border-e-0 [&>*:not(:last-child)]:-me-px [&>*:not(:first-child)]:rounded-s-none
  `, props.class)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { provideButtonPresenter, relayButtonPreseterConfig, useButtonPresenters, type ButtonPresenter, type ButtonPresenterConfig } from './types'
import { cn } from '../utils'

const presenters = useButtonPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | ButtonPresenter
}

const props = withDefaults(defineProps<Props & Partial<ButtonPresenterConfig>>(), {
})

const presenterConfig = relayButtonPreseterConfig(props)
if (props.preset) {
  provideButtonPresenter(computed(() => {
    return typeof props.preset == 'string' ? presenters[props.preset] : props.preset!
  }))
}
</script>
