<template>
  <router-view v-slot="{ Component, route }">
    <Suspense timeout="0">
      <div :key="route.fullPath">
        <Navbar />
        <Error />
        <div v-show="store.errors.length == 0" class="app-container">
          <component v-if="Component" :is="Component" :key="route.fullPath" />
        </div>
      </div>
    </Suspense>
  </router-view>
  <footer class="pt-5"></footer>
</template>

<script setup lang="ts">
import { usePageStore } from "@/store"

import Error from './Error.vue'
import Navbar from './Navbar.vue'

const store = usePageStore()
</script>
