<!--
  SNIP: ed524a4e5c4819c66579868d8245d2de
  FILES:
   - AlertDescription.vue
   - AlertTitle.vue
   - types.ts => Alert-types.ts
   - index.ts => Alert-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { provideAlertPresenter, relayAlertPresenterConfig, useAlertPresenters, type AlertPresenter, type AlertPresenterConfig } from './types'

const presenters = useAlertPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | AlertPresenter
}

const props = withDefaults(defineProps<Props & Partial<AlertPresenterConfig>>(), {
  preset: "standard"
})

const presenterConfig = relayAlertPresenterConfig(props)
const presenter = provideAlertPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)" role="alert">
    <slot />
  </div>
</template>
