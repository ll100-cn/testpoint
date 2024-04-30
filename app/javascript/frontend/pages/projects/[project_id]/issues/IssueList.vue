<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="columns.includes('project')">项目</th>
        <th><SortLink v-model="sorts" code="id">ID</SortLink></th>
        <th><SortLink v-model="sorts" code="title">标题</SortLink></th>
        <th><SortLink v-model="sorts" code="category_id">分类</SortLink></th>
        <th><SortLink v-model="sorts" code="state">状态</SortLink></th>
        <th><SortLink v-model="sorts" code="milestone_title">里程碑</SortLink></th>
        <th><SortLink v-model="sorts" code="creator_id">创建人</SortLink></th>
        <th><SortLink v-model="sorts" code="assignee_id">受理人</SortLink></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="issue in issues" :key="issue.id" :class="{ 'block-discard': issue.archived_at }">
        <td v-if="columns.includes('project')"><router-link :to="`/projects/${issue.project_id}`">{{ issue.project_name }}</router-link></td>
        <td>{{ issue.id }}</td>
        <td><router-link :to="`/projects/${issue.project_id}/issues/${issue.id}`">{{ issue.title }}</router-link></td>
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
import SortLink from '@/components/SortLink.vue';
import { Issue } from '@/models'
import { ref } from 'vue';

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