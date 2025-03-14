<script setup lang="ts">
import { cn } from '../utils'
import { TabsList, TabsRoot, useForwardPropsEmits, type TabsListProps, type TabsRootEmits, type TabsRootProps } from 'reka-ui'
import { computed, useAttrs, type HTMLAttributes } from 'vue'
import { provideNavPresenter, relayNavPresenterConfig, type NavPresenter, type NavPresenterConfig, useNavPresenters } from './types'

const presenters = useNavPresenters()

interface Props extends TabsListProps {
  class?: HTMLAttributes['class']
  preset: keyof typeof presenters | NavPresenter
}

const props = defineProps<Props & Partial<NavPresenterConfig> & TabsRootProps>()
const emits = defineEmits<TabsRootEmits>()

const presenterConfig = relayNavPresenterConfig(props)
const presenter = provideNavPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const forwarded = useForwardPropsEmits(computed(() => {
  const { class: _class, preset, ...delegated } = props
  return delegated
}), emits)
</script>

<template>
  <TabsRoot v-bind="forwarded" as-child>
    <TabsList :class="cn(presenter.list(presenterConfig), props.class)">
      <slot></slot>
    </TabsList>
  </TabsRoot>
</template>
