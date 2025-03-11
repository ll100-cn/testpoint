<script setup lang="ts">
import { CollapsibleContent } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayCollapsiblePresenterConfig, useCollapsiblePresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayCollapsiblePresenterConfig()
const presenter = useCollapsiblePresenter()
</script>

<template>
  <CollapsibleContent v-bind="props" :class="cn(presenter.content(presenterConfig), props.class)">
    <slot />
  </CollapsibleContent>
</template>
