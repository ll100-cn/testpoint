<script setup lang="ts">
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
  <li :class="cn(presenter.item(presenterConfig), props.class)">
    <slot />
  </li>
</template>
