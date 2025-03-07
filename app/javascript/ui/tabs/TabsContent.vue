<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsContent } from 'radix-vue'
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

const presenterConfig = relayTabsPreseterConfig(props)
const presenter = useTabsPresenter()
</script>

<template>
  <TabsContent
    :class="cn(presenter.content(presenterConfig), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </TabsContent>
</template>
