<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'radix-vue'
import { cn } from '@/ui/utils'
import { provideProgressPresenter, relayProgressPreseterConfig, type ProgressPresenter, type ProgressPresenterConfig } from './types'
import * as ProgressPresenters from './presets'
import { computed, type HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof ProgressPresenters | ProgressPresenter
  modelValue: number
}

const props = withDefaults(defineProps<Props & Partial<ProgressPresenterConfig>>(), {
  modelValue: 0
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const presenterConfig = relayProgressPreseterConfig(props)
const presenter = provideProgressPresenter(computed(() => {
  return typeof props.preset == 'string' ? ProgressPresenters[props.preset] : props.preset
}))
</script>

<template>
  <ProgressRoot v-bind="delegatedProps" :class="cn(presenter.root(presenterConfig), props.class)">
    <div class="bg-current opacity-20 absolute inset-0"></div>
    <ProgressIndicator :class="presenter.indicator(presenterConfig)" :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`" />
  </ProgressRoot>
</template>
