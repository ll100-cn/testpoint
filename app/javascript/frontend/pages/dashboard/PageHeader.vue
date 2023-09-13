<template>
  <div class="page-header d-flex align-items-end">
    <h2 class="me-3">仪表盘</h2>

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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  issues_count: number
  current: 'projects' | 'issues'
}>()
</script>