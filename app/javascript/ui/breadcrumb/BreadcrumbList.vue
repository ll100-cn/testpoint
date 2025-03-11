<script setup lang="ts">
import { useSlots, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import BreadcrumbSeparator from "./BreadcrumbSeparator.vue"
import { relayBreadcrumbPresenterConfig, useBreadcrumbPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
const slots = useSlots()
const children = slots.default?.() || []

const presenterConfig = relayBreadcrumbPresenterConfig()
const presenter = useBreadcrumbPresenter()
</script>

<template>
  <ol :class="cn(presenter.list(presenterConfig), props.class)">
    <template v-for="(child, index) in children">
      <component :is="child" />
      <BreadcrumbSeparator v-if="index < children.length - 1" />
    </template>
  </ol>
</template>
