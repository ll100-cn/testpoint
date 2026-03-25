<!--
  SNIP: dea357fc26c9e75163c9be72443bd4e3
  FILES:
   - PaginationEllipsis.vue
   - PaginationFirst.vue
   - PaginationLast.vue
   - PaginationNext.vue
   - PaginationPrev.vue
   - types.ts => Pagination-types.ts
   - index.ts => Pagination-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { PaginationRoot, type PaginationRootProps } from 'reka-ui'
import { providePaginationPresenter, relayPaginationPresenterConfig, usePaginationPresenters, type PaginationPresenter, type PaginationPresenterConfig } from './types'
import { computed } from 'vue'

const presenters = usePaginationPresenters()

interface Props {
  preset?: keyof typeof presenters | PaginationPresenter
}

const props = withDefaults(defineProps<Props & Partial<PaginationPresenterConfig> & PaginationRootProps>(), {
  preset: 'standard',
})

const presenterConfig = relayPaginationPresenterConfig(props)
const presenter = providePaginationPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>
<template>
  <PaginationRoot v-bind="{ ...props }">
    <slot></slot>
  </PaginationRoot>
</template>
