<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { provideTablePresenter, relayTablePreseterConfig, type TablePresenter, type TablePresenterConfig, useTablePresenters } from './types'

const presenters = useTablePresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | TablePresenter
}

const props = withDefaults(defineProps<Props & Partial<TablePresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayTablePreseterConfig(props)
const presenter = provideTablePresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <table :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </table>
</template>
