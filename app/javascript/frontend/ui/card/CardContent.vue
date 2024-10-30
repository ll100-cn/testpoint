<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { relayCardPreseterConfig, useCardPresenter } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const presenterConfig = relayCardPreseterConfig()
const presenter = useCardPresenter()
</script>

<template>
  <div :class="cn(presenter.content(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
