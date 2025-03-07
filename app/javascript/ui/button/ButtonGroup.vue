<template>
  <div :class="cn(`
    flex [&>*:not(:last-child)]:rounded-e-none [&>*:not(:last-child)]:border-e-0 [&>*:not(:last-child)]:-me-px [&>*:not(:first-child)]:rounded-s-none
  `, props.class)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { provideButtonPresenter, relayButtonPreseterConfig, type ButtonPresenter, type ButtonPresenterConfig } from './types'
import * as ButtonPresenters from './presets'
import { cn } from '../utils'

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof ButtonPresenters | ButtonPresenter
}

const props = withDefaults(defineProps<Props & Partial<ButtonPresenterConfig>>(), {
})

const presenterConfig = relayButtonPreseterConfig(props)
if (props.preset) {
  provideButtonPresenter(computed(() => {
    return typeof props.preset == 'string' ? ButtonPresenters[props.preset] : props.preset!
  }))
}
</script>
