<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import TableCell from './TableCell.vue'
import TableRow from './TableRow.vue'
import { relayTablePresenterConfig, useTablePresenter, type TablePresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
  colspan?: number
}

const props = withDefaults(defineProps<Props & Partial<TablePresenterConfig>>(), {
  colspan: 1,
})

const presenterConfig = relayTablePresenterConfig(props)
const presenter = useTablePresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <TableRow>
    <TableCell :v-bind="forwarded "class="cn(presenter.empty(presenterConfig), props.class)">
      <div data-part-inner>
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
