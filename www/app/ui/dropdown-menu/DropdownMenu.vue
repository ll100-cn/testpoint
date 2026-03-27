<!--
  SNIP: 33d22c009dfa835af4047fb887798c4d
  FILES:
   - DropdownMenuContent.vue
   - DropdownMenuItem.vue
   - DropdownMenuLabel.vue
   - DropdownMenuSeparator.vue
   - DropdownMenuSub.vue
   - DropdownMenuSubContent.vue
   - DropdownMenuSubTrigger.vue
   - DropdownMenuTrigger.vue
   - types.ts => DropdownMenu-types.ts
   - index.ts => DropdownMenu-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, useForwardPropsEmits } from 'reka-ui'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, provideDropdownMenuPresenter, type DropdownMenuPresenter, type DropdownMenuPresenterConfig, useDropdownMenuPresenters } from './types'

const presenters = useDropdownMenuPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | DropdownMenuPresenter
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {
  preset: 'standard'
})
const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = provideDropdownMenuPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const emits = defineEmits<DropdownMenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
