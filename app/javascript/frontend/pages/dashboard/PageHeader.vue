<template>
  <PageHeader>
    <PageTitle class="!me-4">仪表盘</PageTitle>

    <router-link v-if="current == 'projects'" class="text-primary me-3" to="/dashboard">
      <i class="far fa-check-square"></i> 按项目
    </router-link>
    <router-link v-else class="text-secondary position-relative me-3" to="/dashboard">
      <i class="far fa-square"></i> 按项目
    </router-link>

    <router-link v-if="current == 'issues'" class="text-primary" to="/dashboard/issues">
      <i class="far fa-check-square"></i> 按个人
      <span class="text-danger">({{ issues_count }})</span>
    </router-link>
    <router-link v-else class="text-secondary position-relative" to="/dashboard/issues">
      <i class="far fa-square"></i> 按个人
      <span class="text-danger">({{ issues_count }})</span>
    </router-link>
  </PageHeader>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue';

defineProps<{
  issues_count: number
  current: 'projects' | 'issues'
}>()
</script>