<template>
  <RouterLink :to="to" custom #="n">
    <a :href="n.href" @click="n.navigate" v-bind="attrs" :data-state="n.isActive ? 'active' : 'inactive'">
      <slot></slot>
    </a>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationNormalized } from 'vue-router'
import { useAttrs } from 'vue'

interface Props {
  to: string | RouteLocationNormalized
}

const props = defineProps<Props>()
const attrs = useAttrs()
</script>
