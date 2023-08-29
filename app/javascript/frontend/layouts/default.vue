<template>
  <router-view v-slot="{ Component, route }">
    <Suspense timeout="0">
      <component v-if="Component" :is="Component" :key="route.fullPath" />
    </Suspense>
  </router-view>
  <footer class="pt-5"></footer>
</template>
