<template>
  <form :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </form>
</template>

<script setup lang="ts" generic="T extends object">
import { computed, provide, ref, type FormHTMLAttributes } from 'vue'
import { FormerKey, provideFormPresenter, relayInjectPreseterConfig, type FormPresenter } from './types'
import { type FormPresenterConfig } from './types'
import { cn } from '$vendor/ui/utils'
import Former from './Former'
import * as FormPresenters from './presets'


interface Props {
  former?: Former<T>
  class?: FormHTMLAttributes['class']
  preset: keyof typeof FormPresenters | FormPresenter
}

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {
  size: 'default'
})

const presenterConfig = relayInjectPreseterConfig(props)
const presenter = provideFormPresenter(computed(() => {
  return typeof props.preset == 'string' ? FormPresenters[props.preset] : props.preset
}))

if (props.former) {
  provide(FormerKey, props.former)
}
</script>
