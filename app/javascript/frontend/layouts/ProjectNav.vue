<template>
  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/test_cases`" active-class="active">案例</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/plans`" active-class="active">计划</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/issues`" active-class="active">问题</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/milestones`" active-class="active">里程碑</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project.id}/analytics`" active-class="active">统计报表</router-link>
  </div>

  <NavItemDropdown>
    <template #toggle>设置</template>
    <template #menu>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/categories`" active-class="active">分类</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/issue_templates`" active-class="active">问题模版</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/members`" active-class="active">成员</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/test_case_labels`" active-class="active">标签</router-link>
      <router-link class="dropdown-item" :to="`/projects/${project.id}/platforms`" active-class="active">平台</router-link>
    </template>
  </NavItemDropdown>
</template>

<script setup lang="ts">
import { Project } from '@/models'
import NavItemDropdown from './NavItemDropdown.vue'

defineProps<{
  project: Project
}>()


</script>