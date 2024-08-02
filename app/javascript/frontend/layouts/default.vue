<template>
  <div class="flex flex-col min-h-screen">
    <router-view v-slot="{ Component, route }">
      <div :key="route.fullPath" class="flex flex-col flex-1">
        <Transition>
          <div class="flex flex-col flex-1">
            <Suspense timeout="0">
              <AppNavbar />
            </Suspense>
            <Error :errors="errors" />
            <Suspense timeout="0">
              <Container class="flex flex-col flex-1">
                <component :is="Component" v-if="Component" />
              </Container>
            </Suspense>
          </div>
        </Transition>
      </div>
    </router-view>
    <footer class="pt-5" />
  </div>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from "vue"
import { onBeforeRouteLeave } from "vue-router"
import Error from './Error.vue'
import AppNavbar from '../components/AppNavbar.vue'
import { Container } from "$vendor/ui"

const errors = ref([])

onBeforeRouteLeave(() => {
  errors.value = []
})

onErrorCaptured((err, vm, info) => {
  console.error(err)
  if (errors.value.length == 0) {
    errors.value.push(err)
  }
  return false
})
</script>
