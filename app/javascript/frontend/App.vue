<template>
  <PresetsConfigProvider>
    <Error :errors="store.errors" />
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="store.errors.length <= 0">
        <template v-for="(_, name) in $slots" #[name]="slotData"><slot :name="name" v-bind="slotData" /></template>
      </component>
    </router-view>
  </PresetsConfigProvider>
</template>

<script setup lang="ts">
import Error from "@/layouts/Error.vue"
import { usePageStore } from "@/store"
import PresetsConfigProvider from "$presets/PresetsConfigProvider.vue"

const store = usePageStore()
</script>
