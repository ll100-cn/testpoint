<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from 'reka-ui'
import { ChevronDownIcon } from '@radix-icons/vue'
import { cn } from '../utils'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relaySelectPresenterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectScrollDownButton v-bind="forwardedProps" :class="cn(
    presenter.scrollDownButton(presenterConfig),
    props.class,
  )">
    <slot>
      <ChevronDownIcon />
    </slot>
  </SelectScrollDownButton>
</template>
