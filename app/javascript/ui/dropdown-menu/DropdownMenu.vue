<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, useForwardPropsEmits } from 'radix-vue'
import { provideDropdownMenuPresenter, relayDropdownMenuPreseterConfig, useDropdownMenuPresenters, type DropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'
import { computed, type HTMLAttributes } from 'vue';

const presenters = useDropdownMenuPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | DropdownMenuPresenter
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {
  preset: 'standard'
})
const emits = defineEmits<DropdownMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = provideDropdownMenuPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
