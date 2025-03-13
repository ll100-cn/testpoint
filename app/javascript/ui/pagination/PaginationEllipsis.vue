<script setup lang="ts">
import { type HTMLAttributes, computed, withDefaults } from 'vue'
import { PaginationEllipsis, useForwardProps, type PaginationEllipsisProps } from 'reka-ui'
import { DotsHorizontalIcon } from '@radix-icons/vue'
import { cn } from '../utils'
import { providePaginationPresenter, relayPaginationPresenterConfig, type PaginationPresenter, type PaginationPresenterConfig, usePaginationPresenters } from './types'

const presenters = usePaginationPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset: keyof typeof presenters | PaginationPresenter
}

const props = withDefaults(defineProps<Props & Partial<PaginationPresenterConfig>>(), {
  preset: 'standard',
})

const presenterConfig = relayPaginationPresenterConfig()
const presenter = providePaginationPresenter(computed(() => {
  return typeof props.preset !== 'string' ? props.preset : presenters[props.preset]
}))

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <PaginationEllipsis v-bind="forwarded" :class="cn(presenter.ellipsis(presenterConfig), props.class)">
    <slot>
      <DotsHorizontalIcon />
    </slot>
  </PaginationEllipsis>
</template>
