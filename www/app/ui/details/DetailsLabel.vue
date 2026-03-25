<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayDetailsPresenterConfig, useDetailsPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayDetailsPresenterConfig()
const presenter = useDetailsPresenter()
</script>

<template>
  <div :class="cn(presenter.label(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
