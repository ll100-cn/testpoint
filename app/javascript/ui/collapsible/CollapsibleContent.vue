<script setup lang="ts">
import { cn } from '$ui/utils'
import { CollapsibleContent } from 'radix-vue'
import { type HTMLAttributes } from 'vue'
import { relayCollapsiblePreseterConfig, useCollapsiblePresenter, type CollapsiblePresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<CollapsiblePresenterConfig>>(), {
})

const presenterConfig = relayCollapsiblePreseterConfig(props)
const presenter = useCollapsiblePresenter()
</script>

<template>
  <CollapsibleContent v-bind="props" :class="cn(presenter.content(presenterConfig), props.class)">
    <slot />
  </CollapsibleContent>
</template>
