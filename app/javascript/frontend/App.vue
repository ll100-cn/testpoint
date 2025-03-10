<template>
  <PresetsConfigProvider>
    <Error v-if="store.errors.length > 0" :errors="store.errors" />
    <router-view v-else />
  </PresetsConfigProvider>
</template>

<script setup lang="ts">
import Error from "@/layouts/Error.vue"
import { usePageStore } from "@/store"
import PresetsConfigProvider from "$presets/PresetsConfigProvider.vue"

const store = usePageStore()
</script>
