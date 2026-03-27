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
  <p :class="cn(presenter.description(presenterConfig), props.class)">
    <slot></slot>
  </p>
</template>
