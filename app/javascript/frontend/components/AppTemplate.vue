<template>
  <Error :errors="store.errors" />
  <router-view v-slot="{ Component }">
    <component :is="Component">
      <template v-for="(_, name) in $slots" #[name]="slotData"><slot :name="name" v-bind="slotData" /></template>
    </component>
  </router-view>
</template>

<script setup lang="ts">
import Error from "@/layouts/Error.vue"
import { usePageStore } from "@/store"

const store = usePageStore()
</script>
