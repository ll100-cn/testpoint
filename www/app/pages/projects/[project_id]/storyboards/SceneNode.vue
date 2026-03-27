<template>
  <Alert variant="tint" class="size-full" :style="{ '--color-tint': utils.calcColorHlsValue(scene.name) }">
    <AlertTitle>{{ scene.name }}</AlertTitle>
  </Alert>
</template>

<script setup lang="ts">
import * as utils from "@/lib/utils"
import { Alert, AlertTitle } from '$ui/alert'
import type { Scene } from '@/models'

const props = defineProps<{
  scene: Scene
}>()
</script>
