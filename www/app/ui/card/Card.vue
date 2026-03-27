<!--
  SNIP: 33d22c009dfa835af4047fb887798c4d
  FILES:
   - CardContent.vue
   - CardDescription.vue
   - CardFooter.vue
   - CardHeader.vue
   - CardTable.vue
   - CardTitle.vue
   - CardTopState.vue
   - types.ts => Card-types.ts
   - index.ts => Card-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { cn } from '../utils'
import { provideCardPresenter, relayCardPresenterConfig, type CardPresenter, type CardPresenterConfig, useCardPresenters } from './types'

const presenters = useCardPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | CardPresenter
}

const props = withDefaults(defineProps<Props & Partial<CardPresenterConfig>>(), {
  preset: 'standard',
})

const presenterConfig = relayCardPresenterConfig(props)
const presenter = provideCardPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
