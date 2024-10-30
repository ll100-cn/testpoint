<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectScrollUpButton, useForwardProps } from 'radix-vue'
import { ChevronUpIcon } from '@radix-icons/vue'
import { cn } from '@/ui/utils'
import { relaySelectPreseterConfig, useSelectPresenter, type SelectPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig>>(), {})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relaySelectPreseterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cn(presenter.scrollUpButton(presenterConfig), props.class)">
    <slot>
      <ChevronUpIcon />
    </slot>
  </SelectScrollUpButton>
</template>
