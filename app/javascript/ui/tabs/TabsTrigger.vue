<script setup lang="ts">
import { cn } from '../utils'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { relayTabsPresenterConfig, useTabsPresenter, type TabsPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<TabsPresenterConfig> & TabsTriggerProps>()

const presenterConfig = relayTabsPresenterConfig(props)
const presenter = useTabsPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <TabsTrigger v-bind="forwarded" :class="cn(presenter.trigger(presenterConfig), props.class)">
    <slot />
  </TabsTrigger>
</template>
