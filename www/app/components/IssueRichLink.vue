<template>
  <span>
    <router-link class="me-3 link" :to="ok_url.apply(`/projects/${issue.projectId}/issues/${issue.id}`)">
      #{{ issue.id }} {{ issue.title }}
    </router-link>
    <IssueStateBadge :state="issue.state" />
  </span>
</template>

<script setup lang="ts">
import { Issue } from '@/models'
import IssueStateBadge from './IssueStateBadge.vue'
import { useRoute } from 'vue-router'
import OkUrl from '@/lib/ok_url'

const props = defineProps<{
  issue: Issue
}>()

const route = useRoute()
const ok_url = new OkUrl(route)
</script>