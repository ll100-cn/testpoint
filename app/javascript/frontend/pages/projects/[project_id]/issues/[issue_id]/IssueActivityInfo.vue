<template>
  <div class="issue-activity">
    <!-- <img class="rounded-circle avatar me-1" :src="user.avatar_url" width="20"> -->
    <span class="me-1">{{ issue_activity.member.name }}</span>
    <span v-if="issue_activity.property == 'state'" class="x-actions">
      <span>将</span>
      <span class="text-info">状态</span>
      <span>从</span>
      <IssueStateBadge :issue_state="issue_activity.before_value" />
      <span>修改为</span>
      <IssueStateBadge :issue_state="issue_activity.after_value" />
    </span>
    <span v-else-if="issue_activity.property == 'assignee_id'" class="x-actions">
      <span>将</span>
      <span class="text-primary">受理人</span>
      <span>从</span>
      <span class="text-primary">{{ _.find(members, { id: _.toInteger(issue_activity.before_value) })?.name ?? "无" }}</span>
      <span>修改为</span>
      <span class="text-primary">{{ _.find(members, { id: _.toInteger(issue_activity.after_value) })?.name ?? "无" }}</span>
    </span>
    <span v-else-if="issue_activity.property == 'creator_id'" class="x-actions">
      <span>将</span>
      <span class="text-primary">创建人</span>
      <span>从</span>
      <span class="text-primary">{{ _.find(members, { id: _.toInteger(issue_activity.before_value) })?.name ?? "无" }}</span>
      <span>修改为</span>
      <span class="text-primary">{{ _.find(members, { id: _.toInteger(issue_activity.after_value) })?.name ?? "无" }}</span>
    </span>
    <span v-else-if="issue_activity.property == 'milestone_id'" class="x-actions">
      <span>将</span>
      <span class="text-info">里程碑</span>
      <span>修改为</span>
      <span class="text-info">{{ _.find(milestones, { id: _.toInteger(issue_activity.after_value) })?.title ?? "无" }}</span>
    </span>
    <span v-else-if="issue_activity.property == 'category_id'" class="x-actions">
      <span>将</span>
      <span class="text-info">分类</span>
      <span>从</span>
      <template v-if="_.find(categories, { id: _.toInteger(issue_activity.before_value) })">
        <span class="badge" :style="`background-color: ${_.find(categories, { id: _.toInteger(issue_activity.before_value) }).color};`">{{ _.find(categories, { id: _.toInteger(issue_activity.before_value) })?.name }}</span>
      </template>
      <template v-else>
        <span class="text-info">无</span>
      </template>
      <span>修改为</span>
      <template v-if="_.find(categories, { id: _.toInteger(issue_activity.after_value) })">
        <span class="badge" :style="`background-color: ${_.find(categories, { id: _.toInteger(issue_activity.after_value) }).color};`">{{ _.find(categories, { id: _.toInteger(issue_activity.after_value) })?.name }}</span>
      </template>
      <template v-else>
        <span class="text-info">无</span>
      </template>
    </span>
    <span v-else-if="issue_activity.property == 'archived_at'" class="x-actions">
      <span class="badge bg-light text-body">归档</span>
      <span>了该该问题</span>
    </span>
    <!-- <%= render "projects/issues/activity/#{activity.property}", formats: [ :html ], activity: activity %> -->

    <span class="small text-muted float-end">{{ utils.humanize(issue_activity.created_at, DATE_LONG_FORMAT) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue"

import { DATE_LONG_FORMAT } from '@/constants'
import * as utils from "@/lib/utils"
import { Category, IssueActivity, IssueRelationship, Member, Milestone } from "@/models"
import * as requests from "@/requests"
import _ from "lodash"

import IssueStateBadge from "@/components/IssueStateBadge.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue_activity: IssueActivity
  project_id: number
  members: Member[]
  milestones: Milestone[]
  categories: Category[]
}>()

// const user = ref(await new requests.UserGet().setup(proxy, (req) => {
//   req.interpolations.user_id = props.issue_activity.member.user_id
// }).perform())

// const issue = computed(() => {
//   return props.issue_relationship.source
// })

// const target = computed(() => {
//   if (issue.value == props.issue_relationship.source) {
//     return props.issue_relationship.target
//   } else {
//     return props.issue_relationship.source
//   }
// })
</script>
