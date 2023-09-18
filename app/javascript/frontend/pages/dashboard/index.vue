<template>
  <PageHeader :issues_count="unhandled_issues_count" current="projects" />

  <div class="card page-card card-x-table">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>项目名称</th>

            <th v-for="(text, code) in ENUM_ISSUE_STAGES">
              {{ text }} ({{ issue_stages_counts.get(code) ?? 0 }})
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="[project, issue_stats_mapping] in grouped_issue_stats">
            <td>{{ project.name }}</td>

            <td v-for="(_, code) in ENUM_ISSUE_STAGES">
              <router-link :to="`/projects/${project.id}/issues?stage=${code}`">
                <CategoryBadge v-for="issue_stat in issue_stats_mapping.get(code) ?? []" class="text-nowrap mb-1 me-2" :category="issue_stat.category" :count="issue_stat.count" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IssueStat2, Project } from '@/models'
import * as requests from '@/lib/requests'
import { computed, getCurrentInstance, ref } from 'vue'
import PageHeader from "./PageHeader.vue"
import CategoryBadge from '@/components/CategoryBadge.vue'

const proxy = getCurrentInstance()!.proxy!

const issue_stats = ref(await new requests.profile.IssueStat2Req.List().setup(proxy).perform())

const ENUM_ISSUE_STAGES = {
  pending: '分配',
  developing: '开发',
  testing: '测试',
  deploying: '部署',
  resolved: '解决',
  closed: '已关闭',
}

const grouped_issue_stats = computed(() => {
  const project_repo = new Map<number, Project>()
  const result = new Map<Project, Map<string, IssueStat2[]>>()

  for (const issue_stat of issue_stats.value) {
    const project = project_repo.get(issue_stat.project_id) || issue_stat.project
    project_repo.set(issue_stat.project_id, project)

    let issue_stats_mapping = result.get(project)
    if (!issue_stats_mapping) {
      issue_stats_mapping = new Map<string, IssueStat2[]>()
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

const unhandled_issues_count = ref((await new requests.profile.IssueReq.Page().setup(proxy, req => {
  req.query.per_page = 1
  req.query.filter = 'unhandled'
}).perform()).total_count)

</script>