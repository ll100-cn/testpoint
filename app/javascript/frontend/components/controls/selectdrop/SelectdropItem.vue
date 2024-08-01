<template>
  <div :data-id="id"><slot></slot></div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, provide, useSlots, type VNode, Text, type VNodeArrayChildren, type VNodeChild } from 'vue'
import { selectdropContextKey } from './types'
import _ from 'lodash'

const id = _.uniqueId('selectdrop-item-')
const name = 'SelectdropItem'

defineOptions({
  name: name
})

const props = defineProps<{
  value?: number | string | null
}>()

const slots = useSlots()
const context = inject(selectdropContextKey)!

provide(selectdropContextKey, {
  ...context,
  register(item) { context.register({ ...item, parent_id: item.parent_id ?? id }) },
})


function traverse(node: VNodeChild, callback: (node: VNode) => void) {
  if (typeof node == 'string' || typeof node == 'number' || typeof node == 'boolean' || node === null || node === undefined) {
    return
  }

  if (node instanceof Array) {
    for (const child of node) {
      traverse(child, callback)
    }
  } else {
    if (node.type == Text) {
      callback(node)
    } else if (typeof node.type == 'symbol') {
      const children = (node.children ?? []) as VNodeArrayChildren

      for (const child of children) {
        traverse(child, callback)
      }
    } else {
      callback(node)
    }
  }
}

onMounted(() => {
  if (!slots.default) {
    context.register({ id, value: props.value })
    return
  }

  const vnodes = [] as VNode[]
  for (const node of slots.default()) {
    traverse(node, (node) => {
      if (_.get(node, 'type.name') != name) {
        vnodes.push(node)
      }
    })
  }

  context.register({ id, value: props.value, content: vnodes })
})

onUnmounted(() => {
  context.unregister(id)
})
</script>
