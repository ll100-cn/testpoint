<!--
  SNIP: ca0f84dbd46db17b68bb6558d749a0c7
-->
<template>
  <select v-model="modelValue" :class="cn(presenter.select(presenterConfig), props.class)">
    <slot />
  </select>
</template>

<script setup lang="ts">
import { type HTMLAttributes, type SelectHTMLAttributes, computed, withDefaults } from 'vue'
import { cn } from '../utils'
import { type InputPresenter, type InputPresenterConfig, provideInputPresenter, relayInputPresenterConfig, useInputPresenters } from './types'

const presenters = useInputPresenters()

interface Props extends /* @vue-ignore */ SelectHTMLAttributes {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | InputPresenter
}

const modelValue = defineModel<string | number | null | (string | number)[]>({ required: true })
const props = withDefaults(defineProps<Props & Partial<InputPresenterConfig>>(), {
  preset: "standard"
})

const presenterConfig = relayInputPresenterConfig(props)
const presenter = provideInputPresenter(computed(() => {
  return typeof props.preset != 'string' ? props.preset : presenters[props.preset]
}))
</script>
