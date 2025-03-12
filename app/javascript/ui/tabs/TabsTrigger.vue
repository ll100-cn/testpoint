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

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="cn(
      presenter.trigger(presenterConfig),
      props.class,
    )"
  >
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
