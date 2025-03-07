<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuSubTrigger,
  useForwardProps,
} from 'radix-vue'
import { ChevronRightIcon } from '@radix-icons/vue'
import { cn } from '$ui/utils'
import { relayDropdownMenuPreseterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="cn(
      presenter.subTrigger(presenterConfig),
      props.class,
    )"
  >
    <slot />
    <ChevronRightIcon class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>
