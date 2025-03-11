<script setup lang="ts">
import { cn } from '../utils'
import { TabsList, type TabsListProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { relayTabsPresenterConfig, useTabsPresenter, type TabsPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<TabsPresenterConfig> & TabsListProps>()

const presenterConfig = relayTabsPresenterConfig(props)
const presenter = useTabsPresenter()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="cn(
      presenter.list(presenterConfig),
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
