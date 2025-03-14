<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { relayCardPresenterConfig, useCardPresenter } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const presenterConfig = relayCardPresenterConfig()
const presenter = useCardPresenter()
</script>

<template>
  <div :class="cn(presenter.table(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
