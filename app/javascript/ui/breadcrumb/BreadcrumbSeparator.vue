<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@radix-icons/vue'
import { cn } from '../utils'
import { relayBreadcrumbPresenterConfig, useBreadcrumbPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayBreadcrumbPresenterConfig()
const presenter = useBreadcrumbPresenter()
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="cn(presenter.separator(presenterConfig), props.class)"
  >
    <slot>
      <ChevronRightIcon class="text-secondary" />
    </slot>
  </li>
</template>
