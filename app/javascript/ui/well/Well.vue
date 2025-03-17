<!--
  SNIP: 7f2d49c778b99ac99546f6b00b3656b0
  FILES:
   - types.ts => Well-types.ts
   - index.ts => Well-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { cn } from '$ui/utils'
import { computed, type HTMLAttributes } from 'vue'
import { provideWellPresenter, relayWellPresenterConfig, useWellPresenters, type WellPresenter, type WellPresenterConfig } from './types'

const presenters = useWellPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | WellPresenter
}

const props = withDefaults(defineProps<Props & Partial<WellPresenterConfig>>(), {
  preset: 'standard',
})

const presenterConfig = relayWellPresenterConfig(props)
const presenter = provideWellPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
