<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../utils'
import { relayDropdownMenuPresenterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
  sideOffset?: DropdownMenuContentProps['sideOffset']
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {
  sideOffset: 4,
})

const emits = defineEmits<DropdownMenuContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const presenterConfig = relayDropdownMenuPresenterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent v-bind="forwarded" :class="cn(presenter.content(presenterConfig), props.class)">
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
