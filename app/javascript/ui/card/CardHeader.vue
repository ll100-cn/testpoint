<script setup lang="ts">
import { inject, useSlots } from 'vue'
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
  <div :class="cn(presenter.header(presenterConfig), props.class)">
    <div data-part-inner>
      <slot></slot>
    </div>

    <div data-part-actions v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
