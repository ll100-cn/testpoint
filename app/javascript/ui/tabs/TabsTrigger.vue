<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsTrigger, useForwardProps } from 'radix-vue'
import { cn } from '$ui/utils'
import { relayTabsPreseterConfig, useTabsPresenter, type TabsPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<TabsPresenterConfig>>(), {})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relayTabsPreseterConfig(props)
const presenter = useTabsPresenter()
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="cn(presenter.trigger(presenterConfig), props.class)">
    <slot />
  </TabsTrigger>
</template>
