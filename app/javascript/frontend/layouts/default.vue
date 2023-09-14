<template>
  <router-view v-slot="{ Component, route }">
    <div :key="route.fullPath">
      <Transition>
        <div>
          <Suspense timeout="0">
            <Navbar />
          </Suspense>
          <Error :errors="errors" />
          <Suspense timeout="0">
            <div class="app-container">
              <component :is="Component" v-if="Component" />
            </div>
          </Suspense>
        </div>
      </Transition>
    </div>
  </router-view>
  <footer class="pt-5" />
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from "vue"
import { onBeforeRouteLeave } from "vue-router"
import Error from './Error.vue'
import Navbar from './Navbar.vue'

const errors = ref([])

onBeforeRouteLeave(() => {
  errors.value = []
})

onErrorCaptured((err, vm, info) => {
  if (errors.value.length == 0) {
    errors.value.push(err)
  }
  return false
})
</script>
