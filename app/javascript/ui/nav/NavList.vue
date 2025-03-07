<script setup lang="ts">
import { cn } from '$ui/utils'
import { TabsList, type TabsListProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import * as NavPresenters from './presets'
import { provideNavPresenter, relayNavPreseterConfig, type NavPresenter, type NavPresenterConfig } from './types'

interface Props extends TabsListProps {
  class?: HTMLAttributes['class']
  preset: keyof typeof NavPresenters | NavPresenter
}

const props = defineProps<Props & Partial<NavPresenterConfig>>()

const presenterConfig = relayNavPreseterConfig(props)
const presenter = provideNavPresenter(computed(() => {
  return typeof props.preset == 'string' ? NavPresenters[props.preset] : props.preset
}))

const delegatedProps = computed(() => {
  const { class: _class, preset, ...delegated } = props
  return delegated
})
</script>

<template>
  <TabsList v-bind="delegatedProps" :class="cn(presenter.list(presenterConfig), props.class)">
    <slot></slot>
  </TabsList>
</template>
