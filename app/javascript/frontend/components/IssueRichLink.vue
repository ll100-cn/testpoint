<template>
  <span>
    <router-link class="me-3" :to="`/projects/${issue.project_id}/issues/${issue.id}`">
      #{{ issue.id }} {{ issue.title }}
    </router-link>
    <IssueStateBadge :state="issue.state" />
  </span>
</template>

<script setup lang="ts">
import { Issue } from '@/models'
import IssueStateBadge from './IssueStateBadge.vue'

const props = defineProps<{
  issue: Issue
}>()
</script>