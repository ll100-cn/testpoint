<script setup lang="ts">
import { injectSelectRootContext, SelectValue, type AcceptableValue, type SelectValueProps } from 'reka-ui'
import { modelValueToArray, useSelectContext } from './types'
import { computed, type VNode } from 'vue'
import _ from 'lodash'

const props = defineProps<SelectValueProps>()

const rootContext = injectSelectRootContext()
const context = useSelectContext()

const compactSelectedNodes = computed<Array<VNode[]>>(() => {
  const values = modelValueToArray(rootContext)

  const groupIds = _(values).map(value => {
    const itemId = context.findItemId(value)
    const item = context.findItem(itemId)
    return item?.group ?? itemId
  }).uniq().value()

  if (groupIds.length == 1) {
    const group = context.findItem(groupIds[0])
    if (group) {
      return [ group.vnodes ]
    }
  }

  const result = [] as Array<VNode[]>
  for (const value of values) {
    const itemId = context.findItemId(value)
    const item = context.findItem(itemId)
    const childValues = context.findChildren(itemId).map(it => it.value)

    if (childValues.some(it => values.includes(it))) {
      continue
    }

    if (item) {
      result.push(item.vnodes)
    }
  }

  return result
})
</script>

<template>
  <SelectValue v-bind="props" #="soltProps">
    <slot v-bind="{ ...soltProps, compactSelectedNodes }" />
  </SelectValue>
</template>
