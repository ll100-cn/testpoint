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

const slots = useSlots()
</script>

<template>
  <div :class="cn(presenter.header(presenterConfig), props.class)">
    <div class="flex items-center w-auto">
      <slot></slot>
    </div>

    <div class="ms-auto flex gap-x-1" v-if="slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
