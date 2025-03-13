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
  <caption :class="cn(presenter.caption(presenterConfig), props.class)">
    <slot />
  </caption>
</template>
