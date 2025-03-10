<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  useForwardPropsEmits,
} from 'radix-vue'
import { cn } from '$ui/utils'
import { relayDropdownMenuPreseterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {})
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <DropdownMenuSubContent v-bind="forwarded" :class="cn(presenter.subContent(presenterConfig), props.class)">
    <slot />
  </DropdownMenuSubContent>
</template>
