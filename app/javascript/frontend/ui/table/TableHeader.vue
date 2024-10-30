<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { relayTablePreseterConfig, useTablePresenter, type TablePresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<TablePresenterConfig>>()
const presenterConfig = relayTablePreseterConfig(props)
const presenter = useTablePresenter()
</script>

<template>
  <thead :class="cn(presenter.header(presenterConfig), props.class)">
    <slot />
  </thead>
</template>
