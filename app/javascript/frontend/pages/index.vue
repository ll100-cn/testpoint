<template></template>
<script setup lang="ts">
import { onActivated } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onActivated(() => {
  router.replace("/dashboard/issues")
})
</script>
