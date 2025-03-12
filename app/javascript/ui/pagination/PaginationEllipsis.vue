<script setup lang="ts">
import { type HTMLAttributes, computed, withDefaults } from 'vue'
import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui'
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

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const presenterConfig = relayPaginationPresenterConfig()
const presenter = providePaginationPresenter(computed(() => {
  if (typeof props.preset != 'string') {
    return props.preset
  }

  return presenters[props.preset]
}))
</script>

<template>
  <PaginationEllipsis v-bind="delegatedProps" :class="cn(presenter.ellipsis(presenterConfig), props.class)">
    <slot>
      <DotsHorizontalIcon />
    </slot>
  </PaginationEllipsis>
</template>
