<script setup lang="ts">
import { type HTMLAttributes, computed, useId } from 'vue'
import { TabsTrigger, useForwardProps, type TabsTriggerProps } from 'reka-ui'
import { cn } from '../utils'
import { relayNavPresenterConfig, useNavPresenter } from './types'

type Props = {
  class?: HTMLAttributes['class']
}

type OptionalTabsTriggerProps = Omit<TabsTriggerProps, 'value'> & Partial<Pick<TabsTriggerProps, 'value'>>
const props = defineProps<OptionalTabsTriggerProps & Props>()

const presenterConfig = relayNavPresenterConfig()
const presenter = useNavPresenter()

const id = useId()
const value = computed(() => {
  return props.value ?? id
})

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <TabsTrigger v-bind="{ ...forwarded, value }" :class="cn(presenter.item(presenterConfig), props.class)">
    <slot></slot>
  </TabsTrigger>
</template>
