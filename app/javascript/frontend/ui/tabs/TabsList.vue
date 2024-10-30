<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsList } from 'radix-vue'
import { cn } from '@/ui/utils'
import { relayTabsPreseterConfig, useTabsPresenter, type TabsPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<TabsPresenterConfig>>(), {})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
const presenterConfig = relayTabsPreseterConfig(props)
const presenter = useTabsPresenter()
</script>

<template>
  <TabsList v-bind="delegatedProps" :class="cn(presenter.list(presenterConfig), props.class)">
    <slot></slot>
  </TabsList>
</template>
