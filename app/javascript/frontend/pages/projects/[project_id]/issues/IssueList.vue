<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-if="columns.includes('project')">项目</TableHead>
        <TableHead><SortLink v-model="sorts" code="id">ID</SortLink></TableHead>
        <TableHead><SortLink v-model="sorts" code="title">标题</SortLink></TableHead>
        <TableHead><SortLink v-model="sorts" code="category_id">分类</SortLink></TableHead>
        <TableHead><SortLink v-model="sorts" code="state">状态</SortLink></TableHead>
        <TableHead><SortLink v-model="sorts" code="milestone_title">里程碑</SortLink></TableHead>
        <TableHead><SortLink v-model="sorts" code="creator_id">创建人</SortLink></TableHead>
        <TableHead><SortLink v-model="sorts" code="assignee_id">受理人</SortLink></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="issue in issues" :key="issue.id" :class="{ 'block-discard': issue.archived_at }">
        <TableCell v-if="columns.includes('project')"><router-link :to="`/projects/${issue.project_id}`">{{ issue.project_name }}</router-link></TableCell>
        <TableCell>{{ issue.id }}</TableCell>
        <TableCell><router-link :to="`/projects/${issue.project_id}/issues/${issue.id}`">{{ issue.title }}</router-link></TableCell>
        <TableCell><CategoryBadge :category="issue.category" /></TableCell>
        <TableCell><IssueStateBadge :state="issue.state" /></TableCell>
        <TableCell>{{ issue.milestone?.title }}</TableCell>
        <TableCell>{{ issue.creator?.name }}</TableCell>
        <TableCell>{{ issue.assignee?.name }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import CategoryBadge from '@/components/CategoryBadge.vue'
import IssueStateBadge from '@/components/IssueStateBadge.vue'
import SortLink from '@/components/SortLink.vue'
import { Issue } from '@/models'
import { ref } from 'vue'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '$vendor/ui'

interface Props {
  issues: Issue[],
  columns?: string[],
  sorts?: string
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => []
})

const sorts = ref(props.sorts)

</script>