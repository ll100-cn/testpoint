<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsTrigger, useForwardProps, type TabsTriggerProps } from 'radix-vue'
import { cn } from '../utils'
import { relayNavPresenterConfig, useNavPresenter } from './types'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const presenterConfig = relayNavPresenterConfig()
const presenter = useNavPresenter()
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="cn(presenter.item(presenterConfig), props.class)">
    <slot></slot>
  </TabsTrigger>
</template>
