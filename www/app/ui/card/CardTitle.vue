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
  <h3 :class="cn(presenter.title(presenterConfig), props.class)">
    <slot></slot>
  </h3>
</template>
