<template>
  <RouterLink :to="to" custom #="n">
    <a v-bind="attrs" :href="n.href" @click.stop="n.navigate" :class="props.class" :data-state="isActive(n) ? 'active' : 'inactive'">
      <slot></slot>
    </a>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, type RouteLocationRaw, type UseLinkReturn } from 'vue-router'
import { computed, useAttrs, type HTMLAttributes, type UnwrapRef } from 'vue'
import * as utils from '@/lib/utils'

defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()

interface Props {
  to: RouteLocationRaw
  class?: HTMLAttributes['class']
  activeBy?: "default" | 'exact' | 'fullpath' | 'query'
  activeColumn?: string
  defaultActiveColumn?: string
}

const props = withDefaults(defineProps<Props>(), {
  activeBy: 'default'
})

const route = useRoute()

function isActive(n: UnwrapRef<UseLinkReturn>) {
  if (props.activeBy == 'exact') {
    return n.isExactActive
  }

  if (props.activeBy == 'fullpath') {
    return route.fullPath == n.href
  }

  if (props.activeBy == 'query') {
    const a = new URL(n.href, location.href).searchParams
    const b = new URL(route.fullPath, location.href).searchParams
    const currentColumnValue = b.get(props.activeColumn!)

    if (!currentColumnValue) {
      return a.get(props.activeColumn!) == props.defaultActiveColumn
    } else if (a.get(props.activeColumn!) == currentColumnValue) {
      return true
    }

    return false
  }

  return n.isActive
}
</script>
