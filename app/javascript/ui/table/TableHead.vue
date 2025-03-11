<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayTablePresenterConfig, useTablePresenter, type TablePresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<TablePresenterConfig>>(), {
  class: '',
})

const presenterConfig = relayTablePresenterConfig(props)
const presenter = useTablePresenter()
</script>

<template>
  <th :class="cn(presenter.head(presenterConfig), props.class)">
    <slot />
  </th>
</template>
