<template>
  <div class="page-header">
    <h2 class="me-1">{{ issue.titleWithPriority() }}</h2>
    <div class="me-1">#{{ issue.id }}</div>
    <span class="me-1">
      <IssueStateBadge :state="issue.state" />
    </span>
    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link class="btn btn-primary" :to="`/projects/${project_id}/issues/${params.issue_id}/edit`">修改</router-link>
    </div>
  </div>

  <div v-if="issue.archived_at" class="alert alert-danger">
    该问题已归档
  </div>

  <div class="row">
    <div class="col-12 col-md-9 order-1 order-md-0 mb-5">
      <IssueRelatedTask v-if="issue.task" :task="issue.task" :project_id="project_id" />
      <IssueSurveyCard
        v-for="issue_survey in issue_surveys"
        :issue="issue"
        :issue_survey="issue_survey"
        @update-issue-info="updateIssueSurvey"
        @destory-issue-info="destoryIssueSurvey" />
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
        @add-issue-info="addIssueSurvey"
        @add-relationship="addRelationship" />
    </div>
    <IssueDetailsSideBar :issue="issue" @update-issue="updateIssue" @refresh-issue="refreshIssue" />
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { IssueSurvey, IssueRelationship, Comment } from "@/models"
import * as requests from '@/lib/requests'
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import IssueContent from "./IssueContent.vue"
import IssueDetailsSideBar from "./IssueDetailsSideBar.vue"
import IssueSurveyCard from "./IssueSurveyCard.vue"
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

const issue_surveys = ref(await new requests.IssueSurveyReq.List().setup(proxy, (req) => {
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

function addIssueSurvey(issue_survey: IssueSurvey) {
  issue_surveys.value.push(issue_survey)
}

function destoryIssueSurvey(issue_survey: IssueSurvey) {
  _.remove(issue_surveys.value, (item) => {
    return item.id == issue_survey.id
  })
}

function updateIssueSurvey(issue_survey: IssueSurvey) {
  const index = _.findIndex(issue_surveys.value, (item) => {
    return item.id == issue_survey.id
  })
  issue_surveys.value[index] = issue_survey
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
