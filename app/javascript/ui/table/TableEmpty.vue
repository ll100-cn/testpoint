<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import TableRow from './TableRow.vue'
import TableCell from './TableCell.vue'
import { cn } from '../utils'
import { relayTablePresenterConfig, useTablePresenter, type TablePresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
  colspan?: number
}

const props = withDefaults(defineProps<Props & Partial<TablePresenterConfig>>(), {
  colspan: 1,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const presenterConfig = relayTablePresenterConfig(props)
const presenter = useTablePresenter()
</script>

<template>
  <TableRow>
    <TableCell :class="cn(`p-4 whitespace-nowrap align-middle text-sm text-foreground`, props.class)" v-bind="delegatedProps" >
      <div class="flex items-center justify-center py-10">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
