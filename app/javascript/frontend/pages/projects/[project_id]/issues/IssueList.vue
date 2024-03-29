<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="columns.includes('project')">项目</th>
        <th>标题</th>
        <th>分类</th>
        <th>状态</th>
        <th>里程碑</th>
        <th>创建人</th>
        <th>受理人</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="issue in issues" :key="issue.id" :class="{ 'block-discard': issue.archived_at }">
        <td v-if="columns.includes('project')"><router-link :to="`/projects/${issue.project_id}`">{{ issue.project_name }}</router-link></td>
        <td><router-link :to="`/projects/${issue.project_id}/issues/${issue.id}`">#{{ issue.id }} {{ issue.title }}</router-link></td>
        <td><CategoryBadge :category="issue.category" /></td>
        <td><IssueStateBadge :state="issue.state" /></td>
        <td>{{ issue.milestone?.title }}</td>
        <td>{{ issue.creator?.name }}</td>
        <td>{{ issue.assignee?.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import CategoryBadge from '@/components/CategoryBadge.vue'
import IssueStateBadge from '@/components/IssueStateBadge.vue'
import { Issue } from '@/models'

interface Props {
  issues: Issue[],
  columns?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => []
})


</script>