<template>
  <div class="nav-item">
    <router-link v-if="allow('read', TestCase)" class="nav-link" :to="`/projects/${project_id}/test_cases`" active-class="active">案例</router-link>
  </div>

  <div class="nav-item">
    <router-link v-if="allow('read', Plan)" class="nav-link" :to="`/projects/${project_id}/plans`" active-class="active">计划</router-link>
  </div>

  <div class="nav-item">
    <router-link v-if="allow('read', Issue)" class="nav-link" :to="`/projects/${project_id}/issues`" active-class="active">问题</router-link>
  </div>

  <div class="nav-item">
    <router-link v-if="allow('read', Milestone)" class="nav-link" :to="`/projects/${project_id}/milestones`" active-class="active">里程碑</router-link>
  </div>

  <div class="nav-item">
    <router-link class="nav-link" :to="`/projects/${project_id}/analytics`" active-class="active">统计报表</router-link>
  </div>

  <NavItemDropdown>
    <template #toggle>设置</template>
    <template #menu>
      <router-link v-if="allow('read', Category)" class="dropdown-item" :to="`/projects/${project_id}/categories`" active-class="active">分类</router-link>
      <router-link v-if="allow('read', IssueTemplate)" class="dropdown-item" :to="`/projects/${project_id}/issue_templates`" active-class="active">问题模版</router-link>
      <router-link v-if="allow('read', Member)" class="dropdown-item" :to="`/projects/${project_id}/members`" active-class="active">成员</router-link>
      <router-link v-if="allow('read', TestCaseLabel)" class="dropdown-item" :to="`/projects/${project_id}/test_case_labels`" active-class="active">标签</router-link>
      <router-link v-if="allow('read', Platform)" class="dropdown-item" :to="`/projects/${project_id}/platforms`" active-class="active">平台</router-link>
    </template>
  </NavItemDropdown>
</template>

<script setup lang="ts">
import { Category, Issue, IssueTemplate, Member, Milestone, Plan, Platform, TestCase, TestCaseLabel } from '@/models'
import { usePageStore } from '@/store'
import NavItemDropdown from './NavItemDropdown.vue'

const page = usePageStore()
const allow = page.inProject().allow

defineProps<{
  project_id: number
}>()

</script>