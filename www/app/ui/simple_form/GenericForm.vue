<template>
  <form :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </form>
</template>

<script setup lang="ts" generic="T extends object">
import { computed, provide, type FormHTMLAttributes } from 'vue'
import { cn } from '../utils'
import Former from './Former'
import { provideFormPresenter, relayFormPresenterConfig, type FormPresenter, type FormPresenterConfig, useFormPresenters, provideFormer } from './types'

const presenters = useFormPresenters()

type Props = {
  former?: Former<T>
  preset: keyof typeof presenters | FormPresenter
  class?: FormHTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {
  size: 'default'
})

const presenterConfig = relayFormPresenterConfig(props)
const presenter = provideFormPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

if (props.former) {
  provideFormer(props.former)
}
</script>
