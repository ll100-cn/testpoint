<template></template>
<script setup lang="ts">
import { onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const params = route.params as any

const project_id = params.project_id

onActivated(() => {
  router.replace(`/projects/${project_id}/issues`)
})
</script>
