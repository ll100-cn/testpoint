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
      <TableRow v-for="issue_box in issue_boxes" :key="issue_box.issue.id" :class="{ 'block-discard': issue_box.issue.archived_at }">
        <TableCell v-if="columns.includes('project')">
          <router-link :to="`/projects/${issue_box.issue.project_id}`">{{ issue_box.issue.project_name }}</router-link>
        </TableCell>
        <TableCell>{{ issue_box.issue.id }}</TableCell>
        <TableCell>
          <router-link class="link" :to="`/projects/${issue_box.issue.project_id}/issues/${issue_box.issue.id}`">
            <span v-if="issue_box.issue.priority === 'important'">!!</span>
            {{ issue_box.issue.title }}
          </router-link>
        </TableCell>
        <TableCell><CategoryBadge :category="issue_box.issue.category" /></TableCell>
        <TableCell><IssueStateBadge :state="issue_box.issue.state" /></TableCell>
        <TableCell>{{ issue_box.issue.milestone?.title }}</TableCell>
        <TableCell>{{ issue_box.issue.creator?.name }}</TableCell>
        <TableCell>{{ issue_box.issue.assignee?.name }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table'
import CategoryBadge from '@/components/CategoryBadge.vue'
import IssueStateBadge from '@/components/IssueStateBadge.vue'
import SortLink from '@/components/SortLink.vue'
import { IssueBox } from '@/models'
import { ref } from 'vue'

interface Props {
  issue_boxes: IssueBox[],
  columns?: string[],
  sorts?: string
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => []
})

const sorts = ref(props.sorts)

</script>
