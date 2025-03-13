<template>
  <PageHeader :issues_count="unhandled_issues_count" current="projects" />

  <Card>
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
            <TableCell class="text-nowrap"><router-link :to="`/projects/${project.id}`">{{ project.name }}</router-link></TableCell>

            <TableCell v-for="[code, text] of enum_issue_stages">
              <router-link v-for="issue_stat in issue_stats_mapping.get(code) ?? []" :to="{ path: `/projects/${project.id}/issues`, query: { stage: code, category_id_eq: issue_stat.category?.id } }">
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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { computed, getCurrentInstance, ref } from 'vue'
import PageHeader from "./PageHeader.vue"
import CategoryBadge from '@/components/CategoryBadge.vue'
import { ENUM_ISSUE_STAGES } from "@/constants"
import { usePageStore, useSessionStore } from '@/store'
import _ from 'lodash'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTable, CardTitle, CardTopState } from '$ui/card'

const reqs = useRequestList()
const page = usePageStore()
const session = useSessionStore()


const enum_issue_stages = computed(() => Object.entries(ENUM_ISSUE_STAGES).filter(([code, text]) => code !== 'archived'))
const issue_stats = reqs.add(q.profile.issue_stats.List).setup().wait()
const member_infos = reqs.raw(session.request(q.profile.members.InfoList)).setup().wait()
const unhandled_issues =  reqs.add(q.profile.issues.Page).setup(req => {
  req.query.per_page = 1
  req.query.filter = 'unhandled'
}).wait()
await reqs.performAll()

const unhandled_issues_count = computed(() => unhandled_issues.value.total_count)
const project_repo = computed(() => new EntityRepo<Project>().setup(member_infos.value.map(it => it.project)))

const grouped_issue_stats = computed(() => {
  const result = new Map<Project, Map<string, IssueStat[]>>()

  for (const project of project_repo.value.values()) {
    result.set(project, new Map<string, IssueStat[]>())
  }

  for (const issue_stat of issue_stats.value) {
    const project = project_repo.value.id.find(issue_stat.project_id)

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

  for (const issue_stat of issue_stats.value) {
    const count = result.get(issue_stat.stage) || 0
    result.set(issue_stat.stage, count + issue_stat.count)
  }

  return result
})
</script>
