<!--
  SNIP: ca0f84dbd46db17b68bb6558d749a0c7
-->
<script setup lang="ts" generic="T">
import { type HTMLAttributes, type InputHTMLAttributes, computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { provideInputPresenter, relayInputPresenterConfig, useInputPresenters, type InputPresenter, type InputPresenterConfig } from './types'
import { cn } from '../utils'

const presenters = useInputPresenters()

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | InputPresenter
}

const props = withDefaults(defineProps<Props & Partial<InputPresenterConfig>>(), {
  preset: 'standard'
})

const modelValue = defineModel<T | null>()

const presenterConfig = relayInputPresenterConfig(props)
const presenter = provideInputPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <input v-bind="forwarded" :class="cn(presenter.input(presenterConfig), props.class)" v-model="modelValue" />
</template>
