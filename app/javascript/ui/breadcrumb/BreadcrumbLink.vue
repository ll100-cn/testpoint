<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { RouterLink } from 'vue-router'
import { cn } from '../utils'
import BreadcrumbItem from './BreadcrumbItem.vue'
import { relayBreadcrumbPresenterConfig, useBreadcrumbPresenter } from './types'

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
  to?: string
}>(), {
  as: 'a',
})

const as = props.to ? RouterLink : props.as
const presenterConfig = relayBreadcrumbPresenterConfig()
const presenter = useBreadcrumbPresenter()
</script>

<template>
  <BreadcrumbItem>
    <Primitive :as="as" :as-child="asChild" :to="to" :class="cn(presenter.link(presenterConfig), props.class)">
      <slot />
    </Primitive>
  </BreadcrumbItem>
</template>
