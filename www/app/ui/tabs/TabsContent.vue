<script setup lang="ts">
import { cn } from '../utils'
import { TabsContent, useForwardProps, type TabsContentProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { provideTabsPresenter, relayTabsPresenterConfig, useTabsPresenter, useTabsPresenters, type TabsPresenter, type TabsPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<TabsPresenterConfig> & TabsContentProps>()

const presenterConfig = relayTabsPresenterConfig(props)
const presenter = useTabsPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _,...delegated } = props
  return delegated
}))
</script>

<template>
  <TabsContent :class="cn(presenter.content(presenterConfig), props.class)" v-bind="forwarded">
    <slot />
  </TabsContent>
</template>
