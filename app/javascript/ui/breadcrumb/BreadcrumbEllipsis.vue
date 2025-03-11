<script setup lang="ts">
import { DotsHorizontalIcon } from '@radix-icons/vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayBreadcrumbPresenterConfig, useBreadcrumbPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayBreadcrumbPresenterConfig()
const presenter = useBreadcrumbPresenter()
</script>

<template>
  <span :class="cn(presenter.ellipsis(presenterConfig), props.class)">
    <slot>
      <DotsHorizontalIcon class="h-4 w-4" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
