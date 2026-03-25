<!--
  SNIP: dea357fc26c9e75163c9be72443bd4e3
  FILES:
   - PopoverContent.vue
   - PopoverTrigger.vue
   - types.ts => Popover-types.ts
   - index.ts => Popover-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui'
import { providePopoverPresenter, relayPopoverPresenterConfig, type PopoverPresenter, type PopoverPresenterConfig, usePopoverPresenters } from './types'
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'

const presenters = usePopoverPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset: keyof typeof presenters | PopoverPresenter
}

const props = withDefaults(defineProps<Props & Partial<PopoverPresenterConfig>>(), {
  preset: "standard"
})

const presenterConfig = relayPopoverPresenterConfig(props)
const presenter = providePopoverPresenter(computed(() =>
  typeof props.preset != 'string' ? props.preset : presenters[props.preset]
))

const emits = defineEmits<PopoverRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <PopoverRoot v-bind="forwarded">
    <slot />
  </PopoverRoot>
</template>
