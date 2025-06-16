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
      <TableRow v-for="{ issue } in issue_boxes" :key="issue.id" :class="{ 'block-discard': issue.archived_at }">
        <TableCell v-if="columns.includes('project')">
          <router-link :to="`/projects/${issue.project_id}`">{{ issue.project_name }}</router-link>
        </TableCell>
        <TableCell>{{ issue.id }}</TableCell>
        <TableCell>
          <router-link class="link" :to="`${path_info.collection}/${issue.id}`">
            <span v-if="issue.priority === 'important'">!!</span>
            {{ issue.title }}
          </router-link>
        </TableCell>
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table'
import CategoryBadge from '@/components/CategoryBadge.vue'
import IssueStateBadge from '@/components/IssueStateBadge.vue'
import SortLink from '@/components/SortLink.vue'
import { type IssueBox } from '@/models'
import { ref } from 'vue'
import PathHelper from '@/lib/PathHelper'
import { useRoute } from 'vue-router'

interface Props {
  issue_boxes: IssueBox[],
  columns?: string[],
  sorts?: string
}

const route = useRoute()
const path_info = PathHelper.parseCollection(route.path, 'index')
const props = withDefaults(defineProps<Props>(), {
  columns: () => []
})

const sorts = ref(props.sorts)

</script>
