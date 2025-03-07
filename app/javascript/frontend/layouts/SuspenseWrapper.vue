<template>
  <slot />
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import SuspenseHelper from './SuspenseHelper'

const props = defineProps<{
  helper: SuspenseHelper
}>()

onErrorCaptured(function(err) {
  return props.helper.handleError(err)
})
</script>
