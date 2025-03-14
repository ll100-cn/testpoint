<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayTablePresenterConfig, useTablePresenter, type TablePresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
  role?: 'default' | 'checkbox' | 'actions'
}

const props = withDefaults(defineProps<Props & Partial<TablePresenterConfig>>(), {
  role: 'default',
})

const extraAttrs = computed(() => {
  const result = {} as Record<string, any>
  result[`data-role-${props.role}`] = ''
  return result
})

const presenterConfig = relayTablePresenterConfig(props)
const presenter = useTablePresenter()
</script>

<template>
  <th v-bind="extraAttrs" :class="cn(presenter.head(presenterConfig), props.class)">
    <slot />
  </th>
</template>
