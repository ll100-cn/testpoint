<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import BreadcrumbItem from './BreadcrumbItem.vue'
import { relayBreadcrumbPresenterConfig, useBreadcrumbPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayBreadcrumbPresenterConfig()
const presenter = useBreadcrumbPresenter()
</script>

<template>
  <BreadcrumbItem>
    <span role="link" aria-disabled="true" aria-current="page" :class="cn(presenter.page(presenterConfig), props.class)">
      <slot />
    </span>
  </BreadcrumbItem>
</template>
