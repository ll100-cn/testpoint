<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { cn } from '../utils'
import { provideTablePresenter, relayTablePresenterConfig, useTablePresenters, type TablePresenter, type TablePresenterConfig } from './types'

const presenters = useTablePresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters
}

const props = withDefaults(defineProps<Props & Partial<TablePresenterConfig>>(), {
  preset: 'standard',
})

const presenterConfig = relayTablePresenterConfig(props)
const presenter = provideTablePresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <table :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </table>
</template>
