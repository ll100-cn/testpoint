<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { CollapsibleRoot, useForwardPropsEmits } from 'reka-ui'
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import { provideCollapsiblePresenter, relayCollapsiblePresenterConfig, type CollapsiblePresenter, type CollapsiblePresenterConfig, useCollapsiblePresenters } from './types'

const presenters = useCollapsiblePresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | CollapsiblePresenter
}

const props = withDefaults(defineProps<Props & Partial<CollapsiblePresenterConfig>>(), {
  preset: 'standard',
})

const emits = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const presenterConfig = relayCollapsiblePresenterConfig(props)
const presenter = provideCollapsiblePresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded">
    <slot :open="open" />
  </CollapsibleRoot>
</template>
