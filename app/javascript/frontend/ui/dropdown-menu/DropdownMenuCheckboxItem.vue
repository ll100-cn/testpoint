<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuCheckboxItem,
  type DropdownMenuCheckboxItemEmits,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '@/ui/utils'
import { relayDropdownMenuPreseterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {})
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuCheckboxItem v-bind="forwarded" :class=" cn(presenter.checkboxItem(presenterConfig), props.class,)">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <CheckIcon class="w-4 h-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
