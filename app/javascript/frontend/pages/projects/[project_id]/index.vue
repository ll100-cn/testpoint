<template></template>
<script setup lang="ts">
import { onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import PathHelper from '@/lib/PathHelper'

const router = useRouter()
const route = useRoute()
const params = route.params as any

const project_id = params.project_id
const path_info = PathHelper.parseMember(route.path, 'show')

onActivated(() => {
  router.replace(`${path_info.resource}/issues`)
})
</script>
