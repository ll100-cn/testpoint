<template>
  <PresetsConfigProvider>
    <Error v-if="page.errors.length > 0" :errors="page.errors" />
    <NuxtLayout v-else>
      <NuxtPage keepalive :page-key="(route) => route.fullPath" />
    </NuxtLayout>
  </PresetsConfigProvider>
</template>

<script setup lang="ts">
import Error from "@/layouts/Error.vue"
import { usePageStore } from "@/store"
import PresetsConfigProvider from "$presets/PresetsConfigProvider.vue"

const page = usePageStore()
</script>
