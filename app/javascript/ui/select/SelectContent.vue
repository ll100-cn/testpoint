<script setup lang="ts">
import { cn, omitProps } from '../utils'
import { SelectContent, type SelectContentEmits, type SelectContentProps, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { relaySelectPresenterConfig, useSelectContext, useSelectPresenter } from './types'

defineOptions({
  inheritAttrs: false,
})

type Props = {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Omit<SelectContentProps, 'position'>>(), {
})
const emits = defineEmits<SelectContentEmits>()

const presenterConfig = relaySelectPresenterConfig()
const presenter = useSelectPresenter()

const context = useSelectContext()

const forwarded = useForwardPropsEmits(computed(() => {
  return omitProps(props, 'class')
}), emits)
</script>

<template>
  <SelectPortal>
    <SelectContent v-bind="{ ...forwarded, ...$attrs }" position="popper" :class="cn(presenter.content(presenterConfig), props.class)">
      <!-- <SelectScrollUpButton />
        <SelectViewport :class="cn('p-1', position === 'popper' && 'h-[--reka-select-trigger-height] w-full min-w-[--reka-select-trigger-width]')"> -->
          <slot :counts="{ total: context.total }" />
        <!-- </SelectViewport>
      <SelectScrollDownButton /> -->
    </SelectContent>
  </SelectPortal>
</template>
