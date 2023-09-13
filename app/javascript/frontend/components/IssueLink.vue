<template>
  <router-link :to="`/projects/${issue.project_id}/issues/${issue.id}`">{{ issue.title }}</router-link>
</template>
<script setup lang="ts">
import { Issue } from '@/models'

defineProps<{
  issue: Issue
}>()
</script>
