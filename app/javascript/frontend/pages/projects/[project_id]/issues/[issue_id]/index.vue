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
    <div class="col order-1 order-md-0 mb-5">
      <IssueRelatedTask v-if="issue.task" :task="issue.task" :project_id="project_id" />
      <IssueContent :issue_info="issue_info" @changed="updateIssueInfo" />
      <IssueSurveyCard :issue_info="issue_info" v-if="issue_info.surveys.length > 0" @changed="updateIssueInfo" />

      <div v-for="item in timelines" class="mb-2">
        <template v-if="(item instanceof Comment)">
          <IssueComment :issue="issue" :comment="item" :comment_repo="comment_repo" @changed="onCommentChanged" @destroyed="onCommentDestroyed" @modal="(...args) => comment_modal.show(...args)" />
        </template>
        <template v-else-if="(item instanceof IssueActivity)">
          <IssueActivityInfo :issue="issue_info" :issue_activity="item" />
        </template>
        <template v-else-if="(item instanceof IssueRelationship)">
          <IssueRelationshipInfo :issue_info="issue_info" :issue_relationship="item" @changed="updateIssueInfo" />
        </template>
      </div>

      <div class="card">
        <div class="card-body">
          <h6 class="card-title">提供更多信息</h6>
          <div class="d-flex x-actions x-spacer-2">
            <button class="btn btn-sm btn-primary" @click="comment_modal.show(IssueCommentCreateFrame, issue)">
              <i class="far fa-comment fa-fw" /> 新增评论
            </button>
            <button class="btn btn-sm btn-primary" @click="issue_info_modal.show(IssueInfoRelationshipNewFrame)">
              <i class="far fa-link fa-fw" /> 关联其它问题
            </button>
            <button class="btn btn-sm btn-primary" @click="issue_info_modal.show(IssueSurveyCreateFrame)">
              <i class="far fa-file-lines fa-fw" /> 新增问题模版
            </button>

            <template v-if="issue.state == 'resolved' && !issue.archived_at">
              <div class="btn-group ms-auto" role="group">
                <button class="btn btn-sm btn-outline-success" @click="issue_info_modal.show(IssueResolveFrame)"><i class="far fa-check me-1" />已解决</button>
                <button class="btn btn-sm btn-outline-danger" @click="issue_info_modal.show(IssueUnresolveFrame)"><i class="far fa-times me-1" />未解决</button>
              </div>
            </template>
            <template v-if="issue.state == 'closed' && !issue.archived_at">
              <div class="btn-group ms-auto" role="group">
                <button class="btn btn-sm btn-outline-success" @click="issue_info_modal.show(IssueResolveFrame)"><i class="far fa-check me-1" />确认关闭</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <IssueDetailsSideBar class="col-12 col-md-3 order-0 order-md-1" :issue_info="issue_info" @changed="updateIssueInfo" />
  </div>
  <teleport to="body">
    <BlankModal ref="comment_modal" @created="onCommentCreated" @changed="onCommentChanged" @destroyed="onCommentDestroyed" />
    <BlankModal ref="issue_info_modal" @changed="updateIssueInfo" v-bind="{ issue_info }" />
  </teleport>
</template>

<script setup lang="ts">
import BlankModal from "@/components/BlankModal.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import * as requests from '@/lib/requests'
import { Comment, CommentRepo, Issue, IssueActivity, IssueInfo, IssueRelationship } from "@/models"
import _ from "lodash"
import { computed, getCurrentInstance, ref } from "vue"
import { useRoute } from "vue-router"
import IssueActivityInfo from "./IssueActivityInfo.vue"
import IssueComment from "./IssueComment.vue"
import IssueCommentCreateFrame from "./IssueCommentCreateFrame.vue"
import IssueContent from "./IssueContent.vue"
import IssueDetailsSideBar from "./IssueDetailsSideBar.vue"
import IssueInfoRelationshipNewFrame from "./IssueInfoRelationshipNewFrame.vue"
import IssueRelatedTask from "./IssueRelatedTask.vue"
import IssueRelationshipInfo from "./IssueRelationshipInfo.vue"
import IssueResolveFrame from "./IssueResolveFrame.vue"
import IssueSurveyCard from "./IssueSurveyCard.vue"
import IssueSurveyCreateFrame from "./IssueSurveyCreateFrame.vue"
import IssueUnresolveFrame from "./IssueUnresolveFrame.vue"

const comment_modal = ref(null as InstanceType<typeof BlankModal>)
const issue_info_modal = ref(null as InstanceType<typeof BlankModal>)
const { proxy } = getCurrentInstance()
const route = useRoute()
const params = route.params as any
const project_id = _.toInteger(params.project_id)

const issue_info = ref(await new requests.project.IssueInfoReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = params.issue_id
}).perform())
const issue = ref(issue_info.value as Issue)

const comments = ref(await new requests.IssueCommentReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue.value.id
}).perform())

const comment_repo = computed(() => {
  return new CommentRepo().setup(comments.value)
})

const timelines = computed(() => {
  return _.orderBy([ ...comment_repo.value.parent_id.findAll(null), ...issue_info.value.activities, ...issue_info.value.target_relationships, ...issue_info.value.source_relationships ], [ "created_at" ])
})

function updateIssueInfo(new_issue_info: IssueInfo) {
  issue_info.value = new_issue_info
  issue.value = issue_info.value
}

function onCommentCreated(comment: Comment) {
  comments.value.push(comment)
}

function onCommentDestroyed(comment: Comment) {
  const index = comments.value.findIndex(it => it.id === comment.id)
  comments.value.splice(index, 1)
}

async function onCommentChanged(comment: Comment) {
  console.log(comment)
  const index = comments.value.findIndex(it => it.id === comment.id)
  comments.value[index] = comment
}
</script>
