<template>
  <div v-for="line in time_lines" :key="line.id" class="mb-3">
    <template v-if="(line instanceof Comment)">
      <template v-if="line.collapsed">
        <IssueUnfoldComment
          v-if="line.comment_id === null"
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
          v-if="line.comment_id === null"
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
import { getCurrentInstance, ref, computed } from "vue"

import { IssueActivity, IssueRelationship, Comment, Issue } from "@/models"
import * as requests from "@/requests"
import _, { Collection } from "lodash"

import IssueUnfoldComment from "./IssueUnfoldComment.vue"
import IssueComment from "./IssueComment.vue"
import IssueRelationshipInfo from "./IssueRelationshipInfo.vue"
import IssueActivityInfo from "./IssueActivityInfo.vue"

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

const members = ref(await new requests.MemberList().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform())

const milestones = await new requests.MilestoneList().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform()

const categories = await new requests.CategoryList().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform()

const child_comment_mapping = computed(() => {
  return _(props.time_lines).filter((line): line is Comment => {
    return line instanceof Comment && !_.isNull(line.comment_id)
  }).groupBy((line) => {
    return line.comment_id
  }).value()
})
</script>
