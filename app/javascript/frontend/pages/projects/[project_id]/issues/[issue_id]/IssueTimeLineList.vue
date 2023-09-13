<template>
  <div v-for="line in available_time_lines" :key="line.id" class="mb-3">
    <template v-if="(line instanceof Comment)">
      <template v-if="line.collapsed">
        <IssueUnfoldComment
          :comment="line"
          :issue="issue"
          :child_comment_mapping="child_comment_mapping"
          @add-comment="emits('addComment', $event)"
          @refresh-comment="emits('refreshComment')"
          @update-comment="emits('updateComment', $event)"
          @destroy-comment="emits('destroyComment', $event)" />
      </template>
      <template v-else>
        <IssueComment
          :issue="issue"
          :comment="line"
          :child_comment_mapping="child_comment_mapping"
          @add-comment="emits('addComment', $event)"
          @refresh-comment="emits('refreshComment')"
          @update-comment="emits('updateComment', $event)"
          @destroy-comment="emits('destroyComment', $event)" />
      </template>
    </template>
    <template v-else-if="(line instanceof IssueActivity)">
      <IssueActivityInfo
        :projects="projects"
        :members="members"
        :categories="categories"
        :milestones="milestones"
        :issue_activity="line"
        :project_id="project_id" />
    </template>
    <template v-else-if="(line instanceof IssueRelationship)">
      <IssueRelationshipInfo
        :issue_id="issue_id"
        :project_id="project_id"
        :issue_relationship="line"
        @destory-relationship="emits('destoryRelationship', $event)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue"

import { Comment, Issue, IssueActivity, IssueRelationship } from "@/models"
import * as requests from '@/lib/requests'
import _ from "lodash"

import IssueActivityInfo from "./IssueActivityInfo.vue"
import IssueComment from "./IssueComment.vue"
import IssueRelationshipInfo from "./IssueRelationshipInfo.vue"
import IssueUnfoldComment from "./IssueUnfoldComment.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  time_lines:(Comment | IssueRelationship | IssueActivity)[]
  project_id: number
  issue_id: number
  issue: Issue
}>()
const emits = defineEmits<{
  destoryRelationship: [issue_relationship: IssueRelationship]
  destroyComment: [comment: Comment]
  updateComment: [comment: Comment]
  addComment: [comment: Comment]
  refreshComment: []
}>()

const members = ref(await new requests.MemberReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform())

const milestones = await new requests.MilestoneReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform()

const categories = await new requests.CategoryReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform()

const projects = ref(await new requests.ProjectReq.Page().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform()).value.list

const available_time_lines = computed(() => {
  return _(props.time_lines).filter((line) => {
    return !(line instanceof Comment) || (line instanceof Comment && _.isNull(line.comment_id))
  }).value()
})

const child_comment_mapping = computed(() => {
  return _(props.time_lines).filter((line): line is Comment => {
    return line instanceof Comment && !_.isNull(line.comment_id)
  }).groupBy((line) => {
    return line.comment_id
  }).value()
})
</script>
