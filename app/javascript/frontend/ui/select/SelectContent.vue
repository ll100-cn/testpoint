<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SelectContent,
  type SelectContentEmits,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'radix-vue'
import { SelectScrollDownButton, SelectScrollUpButton } from '.'
import { cn } from '@/ui/utils'
import { relaySelectPreseterConfig, useSelectPresenter, type SelectPresenterConfig } from './types'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  class?: HTMLAttributes['class']
  position?: 'popper' | 'item-aligned'
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig>>(), {
  position: 'popper',
})

const emits = defineEmits<SelectContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const presenterConfig = relaySelectPreseterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }" :class="cn(
        presenter.content(presenterConfig),
        position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        props.class,
      )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn('p-1', position === 'popper' && 'h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
