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
  <tbody :class="cn(presenter.body(presenterConfig), props.class)">
    <slot></slot>
  </tbody>
</template>
