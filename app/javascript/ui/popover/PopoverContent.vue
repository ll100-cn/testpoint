<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PopoverContent, type PopoverContentEmits, type PopoverContentProps, PopoverPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '../utils'
import { relayPopoverPresenterConfig, usePopoverPresenter } from './types'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>(), {
  align: 'center',
  sideOffset: 4,
})

const presenterConfig = relayPopoverPresenterConfig()
const presenter = usePopoverPresenter()

const emits = defineEmits<PopoverContentEmits>()
const forwarded = useForwardPropsEmits(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}), emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent v-bind="{ ...forwarded, ...$attrs }" :class="cn(presenter.content(presenterConfig), props.class)">
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
