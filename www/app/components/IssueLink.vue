<template>
  <router-link :to="ok_url.apply(`/projects/${issue.projectId}/issues/${issue.id}`)">{{ issue.title }}</router-link>
</template>

<script setup lang="ts">
import { Issue } from '@/models'
import { useRoute } from 'vue-router'
import OkUrl from '@/lib/ok_url'

defineProps<{
  issue: Issue
}>()

const route = useRoute()
const ok_url = new OkUrl(route)
</script>
