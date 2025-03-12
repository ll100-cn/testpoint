<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { cn } from '$ui/utils'
import { provideProgressPresenter, relayProgressPresenterConfig, type ProgressPresenter, type ProgressPresenterConfig, useProgressPresenters } from './types'
import { computed, type HTMLAttributes } from 'vue';

const presenters = useProgressPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | ProgressPresenter
  modelValue: number
}

const props = withDefaults(defineProps<Props & Partial<ProgressPresenterConfig>>(), {
  modelValue: 0
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const presenterConfig = relayProgressPresenterConfig(props)
const presenter = provideProgressPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <ProgressRoot v-bind="delegatedProps" :class="cn(presenter.root(presenterConfig), props.class)">
    <div class="bg-current opacity-20 absolute inset-0"></div>
    <ProgressIndicator :class="presenter.indicator(presenterConfig)" :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`" />
  </ProgressRoot>
</template>
