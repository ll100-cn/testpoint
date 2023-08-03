<template>
  <router-view v-slot="{ Component, route }">
    <Suspense timeout="0">
      <component :is="Component" :key="route.fullPath"></component>
    </Suspense>
  </router-view>
</template>