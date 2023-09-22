<template>
  <div class="d-flex align-items-baseline">
    <MemberLabel :member="issue_activity.member" class="me-1" />

    <span v-if="issue_activity.property == 'state'" class="x-actions x-spacer-1">
      <span>将</span><span class="text-info">状态</span><span>从</span>
      <IssueStateBadge :state="issue_activity.before_value" />
      <span>修改为</span>
      <IssueStateBadge :state="issue_activity.after_value" />
    </span>
    <span v-else-if="issue_activity.property == 'assignee_id'" class="x-actions x-spacer-1">
      <span>将</span><span class="text-primary">受理人</span><span>从</span>

      <MemberLabel v-if="issue_activity.before_assignee" :member="issue_activity.before_assignee" />
      <span v-else class="text-info">无</span>

      <span>修改为</span>

      <MemberLabel v-if="issue_activity.after_assignee" :member="issue_activity.after_assignee" />
      <span v-else class="text-info">无</span>
    </span>
    <span v-else-if="issue_activity.property == 'creator_id'" class="x-actions x-spacer-1">
      <span>将</span><span class="text-primary">创建人</span><span>从</span>

      <MemberLabel v-if="issue_activity.before_creator" :member="issue_activity.before_creator" />
      <span v-else class="text-info">无</span>

      <span>修改为</span>

      <MemberLabel v-if="issue_activity.after_creator" :member="issue_activity.after_creator" />
      <span v-else class="text-info">无</span>
    </span>
    <span v-else-if="issue_activity.property == 'milestone_id'" class="x-actions x-spacer-1">
      <span>将</span><span class="text-info">里程碑</span><span>从</span>


      <span class="text-info">{{ issue_activity.before_milestone?.title ?? "无" }}</span>

      <span>修改为</span>

      <span class="text-info">{{ issue_activity.after_milestone?.title ?? "无" }}</span>
    </span>
    <span v-else-if="issue_activity.property == 'category_id'" class="x-actions x-spacer-1">
      <span>将</span><span class="text-info">分类</span><span>从</span>

      <CategoryBadge v-if="issue_activity.before_category" :category="issue_activity.before_category" />
      <span v-else class="text-info">无</span>

      <span>修改为</span>

      <CategoryBadge v-if="issue_activity.after_category" :category="issue_activity.after_category" />
      <span v-else class="text-info">无</span>
    </span>
    <span v-else-if="issue_activity.property == 'archived_at'" class="x-actions x-spacer-1">
      <span class="badge bg-light text-body">归档</span>
      <span>了该该问题</span>
    </span>
    <span v-else-if="issue_activity.property == 'project_id'" class="x-actions x-spacer-1">
      <span>将</span><span class="text-info">项目</span><span>从</span>
      <span class="text-primary">{{ issue_activity.before_project!.name }}</span>
      <span>修改为</span>
      <span class="text-primary">{{ issue_activity.after_project!.name }}</span>
    </span>

    <span class="small text-muted ms-2">{{ utils.humanize(issue_activity.created_at, DATE_LONG_FORMAT) }}</span>
  </div>
</template>

<script setup lang="ts">
import CategoryBadge from '@/components/CategoryBadge.vue'
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import MemberLabel from '@/components/MemberLabel.vue'
import { DATE_LONG_FORMAT } from '@/constants'
import * as utils from "@/lib/utils"
import { Issue, IssueActivity } from "@/models"

const props = defineProps<{
  issue: Issue
  issue_activity: IssueActivity
}>()
</script>
