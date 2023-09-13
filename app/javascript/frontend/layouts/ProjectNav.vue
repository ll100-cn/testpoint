<template>
  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/test_cases`">案例</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/issues`">问题</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/plans`">计划</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/milestones`">里程碑</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/analytics`">统计报表</router-link>
  </div>

  <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      设置
    </a>
    <div class="dropdown-menu">
      <router-link class="dropdown-item" :to="`/projects/${project.id}/categories`">分类</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/issue_templates`">问题模版</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/members`">成员</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/test_case_labels`">标签</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/platforms`">平台</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Project } from '@/models'

defineProps<{
  project: Project
}>()


</script>