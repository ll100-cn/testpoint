<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, useForwardPropsEmits } from 'radix-vue'
import { provideDropdownMenuPresenter, relayDropdownMenuPreseterConfig, type DropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'
import * as DropdownMenuPresenters from './presets'
import { computed, type HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof DropdownMenuPresenters | DropdownMenuPresenter
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {
  preset: 'standard'
})
const emits = defineEmits<DropdownMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = provideDropdownMenuPresenter(computed(() => {
  return typeof props.preset == 'string' ? DropdownMenuPresenters[props.preset] : props.preset
}))
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
