<template>
  <NavItem value="" as-child>
    <RLink v-if="allow('read', Storyboard)" :to="`/projects/${project_id}/storyboards`">需求</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink v-if="allow('read', TestCase)" :to="`/projects/${project_id}/test_cases`">案例</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink v-if="allow('read', Plan)" :to="`/projects/${project_id}/plans`">计划</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink v-if="allow('read', Issue)" :to="`/projects/${project_id}/issues`">问题</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink v-if="allow('read', Milestone)" :to="`/projects/${project_id}/milestones`">里程碑</RLink>
  </NavItem>

  <NavItem value="" as-child>
    <RLink :to="`/projects/${project_id}/analytics`">统计报表</RLink>
  </NavItem>

  <NavItem value="">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span>设置</span>
        <i class="fa-solid fa-caret-down ms-1"></i>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem as-child v-if="allow('read', Category)"><router-link :to="`/projects/${project_id}/categories`">分类</router-link></DropdownMenuItem>
        <DropdownMenuItem as-child v-if="allow('read', IssueTemplate)"><router-link :to="`/projects/${project_id}/issue_templates`">问题模版</router-link></DropdownMenuItem>
        <DropdownMenuItem as-child v-if="allow('read', Member)"><router-link :to="`/projects/${project_id}/members`">成员</router-link></DropdownMenuItem>
        <DropdownMenuItem as-child v-if="allow('read', TestCaseLabel)"><router-link :to="`/projects/${project_id}/test_case_labels`">标签</router-link></DropdownMenuItem>
        <DropdownMenuItem as-child v-if="allow('read', Platform)"><router-link :to="`/projects/${project_id}/platforms`">平台</router-link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </NavItem>
</template>

<script setup lang="ts">
import { Category, Issue, IssueTemplate, Member, Milestone, Plan, Platform, TestCase, TestCaseLabel, Requirement, Storyboard } from '@/models'
import { usePageStore } from '@/store'
import NavItemDropdown from './NavItemDropdown.vue'
import { Nav, NavList, NavItem } from '$ui/nav'
import RLink from './RLink.vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'

const page = usePageStore()
const allow = page.inProject()!.allow

defineProps<{
  project_id: number
}>()

</script>
