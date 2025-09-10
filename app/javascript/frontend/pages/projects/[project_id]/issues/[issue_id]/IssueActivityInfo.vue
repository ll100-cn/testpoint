<template>
  <div class="flex items-baseline">
    <MemberLabel :member="issue_activity.member" class="me-1" />

    <span v-if="issue_activity.property == 'state'" class="flex items-center space-x-1">
      <span>将</span><span class="text-sky-700">状态</span><span>从</span>
      <IssueStateBadge :state="issue_activity.beforeValue" />
      <span>修改为</span>
      <IssueStateBadge :state="issue_activity.afterValue" />
    </span>
    <span v-else-if="issue_activity.property == 'assignee_id'" class="flex items-center space-x-1">
      <span>将</span><span class="text-primary">受理人</span><span>从</span>

      <MemberLabel v-if="issue_activity.beforeAssignee" :member="issue_activity.beforeAssignee" />
      <span v-else class="text-sky-700">无</span>

      <span>修改为</span>

      <MemberLabel v-if="issue_activity.afterAssignee" :member="issue_activity.afterAssignee" />
      <span v-else class="text-sky-700">无</span>
    </span>
    <span v-else-if="issue_activity.property == 'creator_id'" class="flex items-center space-x-1">
      <span>将</span><span class="text-primary">创建人</span><span>从</span>

      <MemberLabel v-if="issue_activity.beforeCreator" :member="issue_activity.beforeCreator" />
      <span v-else class="text-sky-700">无</span>

      <span>修改为</span>

      <MemberLabel v-if="issue_activity.afterCreator" :member="issue_activity.afterCreator" />
      <span v-else class="text-sky-700">无</span>
    </span>
    <span v-else-if="issue_activity.property == 'milestone_id'" class="flex items-center space-x-1">
      <span>将</span><span class="text-sky-700">里程碑</span><span>从</span>


      <span class="text-sky-700">{{ issue_activity.beforeMilestone?.title ?? "无" }}</span>

      <span>修改为</span>

      <span class="text-sky-700">{{ issue_activity.afterMilestone?.title ?? "无" }}</span>
    </span>
    <span v-else-if="issue_activity.property == 'category_id'" class="flex items-center space-x-1">
      <span>将</span><span class="text-sky-700">分类</span><span>从</span>

      <CategoryBadge v-if="issue_activity.beforeCategory" :category="issue_activity.beforeCategory" />
      <span v-else class="text-sky-700">无</span>

      <span>修改为</span>

      <CategoryBadge v-if="issue_activity.afterCategory" :category="issue_activity.afterCategory" />
      <span v-else class="text-info">无</span>
    </span>
    <span v-else-if="issue_activity.property == 'archived_at'" class="flex items-center space-x-1">
      <span class="badge bg-light text-body">归档</span>
      <span>了该该问题</span>
    </span>
    <span v-else-if="issue_activity.property == 'project_id'" class="flex items-center space-x-1">
      <span>将</span><span class="text-info">项目</span><span>从</span>
      <router-link :to="`/projects/${issue_activity.beforeValue}/issues/${issue_box.issue.id}`">
        <span class="text-primary">{{ issue_activity.beforeProject!.name }}</span>
      </router-link>

      <span>修改为</span>

      <router-link :to="`/projects/${issue_activity.afterValue}/issues/${issue_box.issue.id}`">
        <span class="text-primary">{{ issue_activity.afterProject!.name }}</span>
      </router-link>
    </span>

    <span class="text-sm text-muted ms-2">{{ h.datetime(issue_activity.createdAt) }}</span>
  </div>
</template>

<script setup lang="ts">
import CategoryBadge from '@/components/CategoryBadge.vue'
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import MemberLabel from '@/components/MemberLabel.vue'
import * as h from '@/lib/humanize'
import { type IssueBox, IssueActivity } from "@/models"

const props = defineProps<{
  issue_box: IssueBox
  issue_activity: IssueActivity
}>()
</script>
