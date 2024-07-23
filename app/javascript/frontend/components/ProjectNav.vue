<template>
  <NavItem value="" as-child>
    <RLink v-if="allow('read', TestCase)" :to="`/projects/${project_id}/test_cases`" active-class="active">案例</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink v-if="allow('read', Plan)" :to="`/projects/${project_id}/plans`" active-class="active">计划</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink v-if="allow('read', Issue)" :to="`/projects/${project_id}/issues`" active-class="active">问题</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink v-if="allow('read', Milestone)" :to="`/projects/${project_id}/milestones`" active-class="active">里程碑</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink :to="`/projects/${project_id}/analytics`" active-class="active">统计报表</RLink>
  </NavItem>

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
import { Nav, NavList, NavItem } from '$vendor/ui'
import RLink from './RLink.vue'

const page = usePageStore()
const allow = page.inProject().allow

defineProps<{
  project_id: number
}>()

</script>