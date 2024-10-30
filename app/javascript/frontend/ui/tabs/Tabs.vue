<script setup lang="ts">
import { TabsRoot, useForwardPropsEmits } from 'radix-vue'
import type { TabsRootEmits } from 'radix-vue'
import { provideTabsPresenter, relayTabsPreseterConfig, type TabsPresenter, type TabsPresenterConfig } from './types'
import * as TabsPresenters from './presets'
import { computed, type HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof TabsPresenters | TabsPresenter
}

const props = withDefaults(defineProps<Props & Partial<TabsPresenterConfig>>(), {
  preset: 'standard'
})

const emits = defineEmits<TabsRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relayTabsPreseterConfig(props)
const presenter = provideTabsPresenter(computed(() => {
  return typeof props.preset == 'string' ? TabsPresenters[props.preset] : props.preset
}))
</script>

<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>
