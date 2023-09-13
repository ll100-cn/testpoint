<template>
  <div class="page-header">
    <h2 class="me-1">{{ issue.titleWithPriority() }}</h2>
    <div class="me-1">#{{ issue.id }}</div>
    <span class="me-1">
      <IssueStateBadge :state="issue.state" />
    </span>
    <div class="d-flex ms-auto x-spacer-3">
      <router-link class="btn btn-primary" :to="`/projects/${project_id}/issues/${params.issue_id}/edit`">修改</router-link>
    </div>
  </div>

  <div v-if="issue.archived_at" class="alert alert-danger">
    该问题已归档
  </div>

  <div class="row">
    <div class="col-12 col-md-9 order-1 order-md-0 mb-5">
      <IssueRelatedTask v-if="issue.task" :task="issue.task" :project_id="project_id" />
      <IssueInfoCard
        v-for="issue_info in issue_infos"
        :key="issue_info.id"
        :issue="issue"
        :issue_info="issue_info"
        @update-issue-info="updateIssueInfo"
        @destory-issue-info="destoryIssueInfo" />
      <IssueContent
        :issue="issue"
        :user="user"
        :issue_attachments="issue_attachments"
        @update-issue="updateIssue"
        @refresh-issue="refreshIssue" />
      <IssueTimeLineList
        :issue="issue"
        :time_lines="time_lines"
        :issue_id="issue.id"
        :project_id="project_id"
        @add-comment="addComment"
        @refresh-comment="refreshComment"
        @update-comment="updateComment"
        @destroy-comment="destroyComment"
        @destory-relationship="destoryRelationship" />
      <IssueOtherActions
        :issue="issue"
        @update-issue="updateIssue"
        @add-comment="addComment"
        @add-issue-info="addIssueInfo"
        @add-relationship="addRelationship" />
    </div>
    <IssueDetailsSideBar :issue="issue" @update-issue="updateIssue" @refresh-issue="refreshIssue" />
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import { IssueInfo, IssueRelationship, Comment } from "@/models"
import * as requests from '@/lib/requests'
import { useSessionStore } from "@/store/session"
import _ from "lodash"

import IssueStateBadge from "@/components/IssueStateBadge.vue"
import IssueContent from "./IssueContent.vue"
import IssueDetailsSideBar from "./IssueDetailsSideBar.vue"
import IssueInfoCard from "./IssueInfoCard.vue"
import IssueOtherActions from "./IssueOtherActions.vue"
import IssueRelatedTask from "./IssueRelatedTask.vue"
import IssueTimeLineList from "./IssueTimeLineList.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const store = useSessionStore()
const params = route.params as any
const project_id = _.toInteger(params.project_id)

store.account = await new requests.AccountReq.Get().setup(proxy).perform()
const user = store.account.user

const issue = ref(await new requests.IssueReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = params.issue_id
}).perform())

const issue_attachments = ref(await new requests.IssueAttachments().setup(proxy, (req) => {
  req.interpolations.project_id = issue.value.project_id
  req.interpolations.issue_id = issue.value.id
}).perform())

const issue_infos = ref(await new requests.IssueInfoReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue.value.id
}).perform())

const comments = ref(await new requests.IssueCommentReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue.value.id
}).perform())

const issue_activities = ref(await new requests.IssueActivitiyReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue.value.id
}).perform())

const issue_target_relationships = ref(await new requests.IssueTargetRelationshipReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue.value.id
}).perform())

const issue_source_relationships = ref(await new requests.IssueSourceRelationshipReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue.value.id
}).perform())

const time_lines = computed(() => {
  return _.orderBy([ ...comments.value, ...issue_activities.value, ...issue_target_relationships.value, ...issue_source_relationships.value ], [ "created_at" ])
})

function addRelationship(issue_relationship: IssueRelationship) {
  issue_source_relationships.value.push(issue_relationship)
}

function destoryRelationship(issue_relationship: IssueRelationship) {
  _.remove(issue_source_relationships.value, (item) => {
    return item.id == issue_relationship.id
  })
}

async function updateIssue(new_issue) {
  issue.value = new_issue
  issue_activities.value = await new requests.IssueActivitiyReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue.value.id
  }).perform()
  comments.value = await new requests.IssueCommentReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue.value.id
  }).perform()
  issue_attachments.value = await new requests.IssueAttachments().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
  }).perform()
}

async function refreshIssue() {
  issue.value = await new requests.IssueReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = params.issue_id
  }).perform()
  issue_activities.value = await new requests.IssueActivitiyReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue.value.id
  }).perform()
  issue_attachments.value = await new requests.IssueAttachments().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
  }).perform()
}

function addIssueInfo(issue_info: IssueInfo) {
  issue_infos.value.push(issue_info)
}

function destoryIssueInfo(issue_info: IssueInfo) {
  _.remove(issue_infos.value, (item) => {
    return item.id == issue_info.id
  })
}

function updateIssueInfo(issue_info: IssueInfo) {
  const index = _.findIndex(issue_infos.value, (item) => {
    return item.id == issue_info.id
  })
  issue_infos.value[index] = issue_info
}

function addComment(comment: Comment) {
  comments.value.push(comment)
}

function destroyComment(comment: Comment) {
  _.remove(comments.value, (item) => {
    return item.id == comment.id
  })
}

async function updateComment(comment: Comment) {
  const index = _.findIndex(comments.value, (item) => {
    return item.id == comment.id
  })
  comments.value[index] = comment
}

async function refreshComment() {
  comments.value = await new requests.IssueCommentReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = issue.value.id
  }).perform()
}
</script>
