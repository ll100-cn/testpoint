<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayCardPresenterConfig, useCardPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayCardPresenterConfig()
const presenter = useCardPresenter()
</script>

<template>
  <div :class="cn(presenter.footer(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
