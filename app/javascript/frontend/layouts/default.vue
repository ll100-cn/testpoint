<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-col flex-1">
      <div class="flex flex-col flex-1">
        <suspense>
          <AppNavbar />
        </suspense>

        <Error v-if="errors.length > 0" :errors="errors" />

        <Container v-else class="flex flex-col flex-1" :class="{ 'select-none grayscale opacity-40 pointer-events-none': view.state == 'pending' }">
          <router-view v-slot="{ Component, route }">
            <keep-alive>
              <suspense v-bind="{ ...view.events() }">
                <component :is="Component" :key="route.fullPath" />
              </suspense>
            </keep-alive>
          </router-view>
        </Container>
      </div>
    </div>
    <footer class="pt-5" />
  </div>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from "vue"
import { onBeforeRouteLeave, useRoute } from "vue-router"
import Error from './Error.vue'
import AppNavbar from '../components/AppNavbar.vue'
import { Container } from "$ui/container"
import SuspenseHelper from "./SuspenseHelper"

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

const view = SuspenseHelper.build()
</script>
