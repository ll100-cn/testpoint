<template>
  <router-view v-slot="{ Component, route }">
    <Suspense timeout="0">
      <div :key="route.fullPath">
        <Navbar />
        <div class="app-container">
          <component v-if="Component" :is="Component" />
        </div>
      </div>
    </Suspense>
  </router-view>
  <footer class="pt-5"></footer>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
</script>