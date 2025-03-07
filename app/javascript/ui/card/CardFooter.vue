<script setup lang="ts">
import { inject, type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { relayCardPreseterConfig, useCardPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayCardPreseterConfig()
const presenter = useCardPresenter()
</script>

<template>
  <div :class="cn(presenter.footer(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
