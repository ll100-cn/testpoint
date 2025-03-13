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
