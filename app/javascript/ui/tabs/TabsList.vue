<script setup lang="ts">
import { cn } from '../utils'
import { TabsList, useForwardProps, type TabsListProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { relayTabsPresenterConfig, useTabsPresenter, type TabsPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<TabsPresenterConfig> & TabsListProps>()

const presenterConfig = relayTabsPresenterConfig(props)
const presenter = useTabsPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _,...delegated } = props
  return delegated
}))
</script>

<template>
  <TabsList v-bind="forwarded" :class="cn( presenter.list(presenterConfig), props.class)">
    <slot />
  </TabsList>
</template>
