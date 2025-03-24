<template>
  <slot />
</template>

<script setup lang="ts">
import { injectSelectRootContext, type AcceptableValue } from 'reka-ui'
import { useSelectContext } from './types'
import _ from 'lodash'

const context = useSelectContext()
function findDescendantValues(value: AcceptableValue): AcceptableValue[] {
  const itemId = context.findItemId(value)
  const children = context.findChildren(itemId)
  return children.flatMap(it => [ it.value, ...findDescendantValues(it.value) ])
}

function findAncestorValues(value: AcceptableValue): AcceptableValue[] {
  const itemId = context.findItemId(value)
  const item = context.findItem(itemId)
  const parentValue = context.findItem(item?.group)?.value
  if (!parentValue) {
    return []
  }

  return [ ...findAncestorValues(parentValue), parentValue ]
}

const rootContext = injectSelectRootContext()
const originalOnValueChange = rootContext.onValueChange
rootContext.onValueChange = function(value) {
  if (!this.multiple.value) {
    originalOnValueChange.call(this, value)
    return
  }

  let newModelValue = Array.isArray(rootContext.modelValue.value) ? Array.from(rootContext.modelValue.value) : [value]
  const newChecked = !newModelValue.includes(value)

  if (newChecked) {
    newModelValue = _.concat(newModelValue, value, ...findDescendantValues(value))
    const ancestorValues = findAncestorValues(value)

    for (const ancestorValue of ancestorValues.reverse()) {
      const ancestorId = context.findItemId(ancestorValue)
      const childValues = context.findChildren(ancestorId).map(it => it.value)

      if (_.difference(childValues, newModelValue).length == 0) {
        newModelValue = _.concat(newModelValue, ancestorValue)
      }
    }

  } else {
    newModelValue = _.difference(newModelValue, [ value, ...findDescendantValues(value) ])
    newModelValue = _.difference(newModelValue, findAncestorValues(value))
  }

  rootContext.modelValue.value = _.uniq(newModelValue)
}
</script>

