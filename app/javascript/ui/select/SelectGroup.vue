<script setup lang="ts">
import { injectSelectRootContext, SelectGroup, Slot, useForwardProps, type AcceptableValue, type SelectGroupProps } from 'reka-ui'
import { computed, useId, type HTMLAttributes } from 'vue'
import { cn, omitProps } from '../utils'
import { modelValueToArray, provideSelectContext, relaySelectPresenterConfig, useSelectContext, useSelectPresenter } from './types'
import _ from 'lodash'

type Props = {
  class?: HTMLAttributes['class']
  value?: AcceptableValue
}

const props = defineProps<Props & SelectGroupProps>()

const presenterConfig = relaySelectPresenterConfig()
const presenter = useSelectPresenter()

const groupId = useId()
const rootContext = injectSelectRootContext()
const context = useSelectContext()
provideSelectContext({
  ...context,

  registerItem(itemId, attrs) {
    if (attrs.value === props.value) {
      context.registerItem(groupId, attrs)
    } else {
      context.registerItem(itemId, { ...attrs, group: groupId })
    }
  },

  unregisterItem(id, value) {
    if (value === props.value) {
      context.unregisterItem(groupId, value)
    } else {
      context.unregisterItem(id, value)
    }
  }
})

const counts = computed(() => {
  const result = { total: 0, selected: 0 }
  const childValues = context.findChildren(groupId).map(it => it.value)
  result.total = childValues.length
  const values = modelValueToArray(rootContext)
  result.selected = _.intersection(childValues, values).length
  return result
})

const forwarded = useForwardProps(computed(() =>
  omitProps(props, 'class', 'value')
))
</script>

<template>
  <SelectGroup :class="cn(presenter.group(presenterConfig), props.class)" v-bind="forwarded">
    <Slot :key="JSON.stringify([ value, counts ])">
      <slot name="label" v-bind="{ value, counts }" />
    </Slot>

    <slot />
  </SelectGroup>
</template>
