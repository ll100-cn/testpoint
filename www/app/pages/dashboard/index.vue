<template>
  <PageHeader :issues_count="unhandled_issues_count" current="projects" />

  <Card>
    <CardTopState v-if="loading" />

    <CardTable>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="text-nowrap">项目名称</TableHead>

            <TableHead class="text-nowrap" v-for="[code, text] of enum_issue_stages">
              {{ text }} ({{ issue_stages_counts.get(code) ?? 0 }})
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="[project, issue_stats_mapping] of grouped_issue_stats">
            <TableCell class="text-nowrap"><router-link :to="ok_url.apply(`/projects/${project.id}`)">{{ project.name }}</router-link></TableCell>

            <TableCell v-for="[code, text] of enum_issue_stages">
              <router-link v-for="issue_stat in issue_stats_mapping.get(code) ?? []" :to="ok_url.apply({ path: `/projects/${project.id}/issues`, query: { stage: code, category_id_eq: issue_stat.category?.id } })">
                <CategoryBadge class="text-nowrap mb-1 me-2" :category="issue_stat.category" :count="issue_stat.count" />
              </router-link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardTable>
  </Card>
</template>

<script setup lang="ts">
import { EntityRepo, IssueStat, Project } from '@/models'
import * as q from '@/requests'
import type { IssuePageWithCountsType } from '@/schemas/issue'
import type { MemberInfoListType } from '@/schemas/member'
import { computed } from 'vue'
import PageHeader from "./PageHeader.vue"
import CategoryBadge from '@/components/CategoryBadge.vue'
import { ENUM_ISSUE_STAGES } from "@/constants"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardTable, CardTopState } from '$ui/card'
import { useQueryLine } from '@/lib/useQueryLine'
import { useRoute } from 'vue-router'
import OkUrl from '@/lib/ok_url'

const line = useQueryLine()
const route = useRoute()
const ok_url = new OkUrl(route)
const EMPTY_MEMBER_BOXES: MemberInfoListType = []
const EMPTY_ISSUE_PAGE: IssuePageWithCountsType = {
  total_count: 0,
  offset: 0,
  limit: 1,
  list: [],
  issue_stats: [],
}

const enum_issue_stages = computed(() => Object.entries(ENUM_ISSUE_STAGES).filter(([code, text]) => code !== 'archived'))
const { data: member_boxes, isLoading: memberBoxesLoading } = line.request(q.profile.members.List('+project'), (req, it) => {
  return it.useQuery({
    ...req.toQueryConfig(),
    placeholderData: EMPTY_MEMBER_BOXES,
  })
})
const { data: unhandled_issue_page, isLoading: issuesLoading } = line.request(q.profile.issues.Page(), (req, it) => {
  req.query = { per_page: 1, filter: 'unhandled' }
  return it.useQuery({
    ...req.toQueryConfig(),
    placeholderData: EMPTY_ISSUE_PAGE,
  })
})

const loading = computed(() => memberBoxesLoading.value || issuesLoading.value)
const unhandled_issues_count = computed(() => unhandled_issue_page.value.total_count)
const project_repo = computed(() => new EntityRepo<Project>().setup(member_boxes.value.map(it => it.project)))

const grouped_issue_stats = computed(() => {
  const result = new Map<Project, Map<string, IssueStat[]>>()

  for (const project of project_repo.value.values()) {
    result.set(project, new Map<string, IssueStat[]>())
  }

  for (const issue_stat of unhandled_issue_page.value.issue_stats) {
    const project = project_repo.value.id.find(issue_stat.project_id)
    if (!project) {
      continue
    }

    let issue_stats_mapping = result.get(project)
    if (!issue_stats_mapping) {
      issue_stats_mapping = new Map<string, IssueStat[]>()
      result.set(project, issue_stats_mapping)
    }

    let issue_stats = issue_stats_mapping.get(issue_stat.stage)
    if (!issue_stats) {
      issue_stats = []
      issue_stats_mapping.set(issue_stat.stage, issue_stats)
    }

    issue_stats.push(issue_stat)
  }

  return result
})

const issue_stages_counts = computed(() => {
  const result = new Map<string, number>()

  for (const issue_stat of unhandled_issue_page.value.issue_stats) {
    const count = result.get(issue_stat.stage) || 0
    result.set(issue_stat.stage, count + issue_stat.count)
  }

  return result
})
</script>
