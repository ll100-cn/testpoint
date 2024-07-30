<script setup lang="ts">
import { cn } from '$vendor/ui/utils'
import { TabsTrigger, useForwardProps, type TabsTriggerProps } from 'radix-vue'
import { computed, useAttrs, type HTMLAttributes } from 'vue'
import { relayNavPreseterConfig, useNavPresenter } from './types'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const presenterConfig = relayNavPreseterConfig()
const presenter = useNavPresenter()
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="cn(presenter.item(presenterConfig), props.class)">
    <slot></slot>
  </TabsTrigger>
</template>
