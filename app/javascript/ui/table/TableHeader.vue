<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayTablePresenterConfig, useTablePresenter, type TablePresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<TablePresenterConfig>>(), {
})

const presenterConfig = relayTablePresenterConfig(props)
const presenter = useTablePresenter()
</script>

<template>
  <thead :class="cn(presenter.header(presenterConfig), props.class)">
    <slot />
  </thead>
</template>
