<!--
  SNIP: 7f2d49c778b99ac99546f6b00b3656b0
  FILES:
   - Tabs.vue
   - TabsContent.vue
   - TabsList.vue
   - TabsTrigger.vue
   - types.ts => Tabs-types.ts
   - index.ts => Tabs-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
import { provideTabsPresenter, relayTabsPresenterConfig, useTabsPresenters, type TabsPresenter, type TabsPresenterConfig } from './types'
import { computed, provide } from 'vue'

const presenters = useTabsPresenters()

interface Props {
  preset: keyof typeof presenters
}

const props = withDefaults(defineProps<Props & Partial<TabsPresenterConfig> & TabsRootProps>(), {
  preset: 'standard'
})

const presenterConfig = relayTabsPresenterConfig(props)
const presenter = provideTabsPresenter(computed(() => {
  if (typeof props.preset != 'string') {
    return props.preset
  }

  return presenters[props.preset]
}))

const emits = defineEmits<TabsRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>
