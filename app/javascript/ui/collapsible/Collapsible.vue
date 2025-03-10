<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits } from 'radix-vue'
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'
import { provideCollapsiblePresenter, relayCollapsiblePreseterConfig, type CollapsiblePresenter, type CollapsiblePresenterConfig, useCollapsiblePresenters } from './types'
import { computed, type HTMLAttributes } from 'vue';

const presenters = useCollapsiblePresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | CollapsiblePresenter
}

const props = withDefaults(defineProps<Props & Partial<CollapsiblePresenterConfig>>(), {
  preset: 'standard'
})

const emits = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const presenterConfig = relayCollapsiblePreseterConfig(props)
const presenter = provideCollapsiblePresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded">
    <slot :open="open" />
  </CollapsibleRoot>
</template>
