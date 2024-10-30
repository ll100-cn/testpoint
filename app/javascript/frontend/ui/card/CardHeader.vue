<script setup lang="ts">
import { useSlots, type HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { relayCardPreseterConfig, useCardPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const slots = useSlots()

const presenterConfig = relayCardPreseterConfig()
const presenter = useCardPresenter()
</script>

<template>
  <div :class="cn(presenter.rounded(presenterConfig), 'rounded-b-none', presenter.header(presenterConfig), props.class)">
    <div class="flex items-center w-auto">
      <slot></slot>
    </div>

    <div class="ms-auto flex gap-x-1" v-if="slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
