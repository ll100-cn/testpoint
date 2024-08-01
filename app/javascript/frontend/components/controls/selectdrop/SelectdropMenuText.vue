<template>
  <span>
    <template v-if="!_.isEmpty(content)">
      <component v-for="(node, index) in content" :key="node.key ?? index" :is="node" />
    </template>

    <span v-if="childValues.length > 0" class="text-muted ms-1">
    (<template v-if="selectedChildrenCount > 0">{{ selectedChildrenCount }}/</template>{{ childValues.length }})
    </span>
  </span>
</template>

<script setup lang="ts">
import _ from "lodash"
import { computed, inject, type VNode } from 'vue'
import { selectdropContextKey } from "./types"

const props = withDefaults(defineProps<{
  value: string
  content?: VNode[]
  childValues?: string[]
}>(), {
  childValues: () => []
})

const context = inject(selectdropContextKey)!
const selectedChildrenCount = computed(() => {
  return props.childValues.filter((childValue) => context.menuValues.has(childValue)).length
})
</script>
