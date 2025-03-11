<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'reka-ui'
import { ChevronUpIcon } from '@radix-icons/vue'
import { cn } from '../utils'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relaySelectPresenterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cn(
    presenter.scrollUpButton(presenterConfig),
    props.class,
  )">
    <slot>
      <ChevronUpIcon />
    </slot>
  </SelectScrollUpButton>
</template>
