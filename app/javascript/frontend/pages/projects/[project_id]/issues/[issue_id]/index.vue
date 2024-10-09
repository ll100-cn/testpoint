<template>
  <PageHeader>
    <PageTitle class="me-1">#{{ issue_info.id }} {{ issue_info.titleWithPriority() }}</PageTitle>
    <span class="me-1">
      <IssueStateBadge :state="issue_info.state" />
    </span>
    <div class="flex ms-auto space-x-3 items-center">
      <Button v-if="!readonly && allow('update', Issue)" :to="`/projects/${project_id}/issues/${params.issue_id}/edit`">修改</Button>
    </div>
  </PageHeader>

  <div v-if="issue_info.archived_at" class="alert alert-danger">
    该问题已完结
  </div>

  <div class="flex gap-x-6">
    <div class="flex-1 space-y-4">
      <IssueRelatedTask v-if="issue_info.task" :task="issue_info.task" :project_id="project_id" />
      <IssueContent :readonly="readonly" :issue_info="issue_info" @updated="onIssueInfoUpdated" @convert="onIssueConvert" />
      <IssueSurveyCard :readonly="readonly" :issue_info="issue_info" v-if="issue_info.surveys.length > 0" @modal="(...args) => issue_info_dialog.show(...args)" />

      <div v-for="item in timelines" class="mb-2">
        <template v-if="(item instanceof Comment)">
          <IssueComment :readonly="readonly" :issue="issue_info" :comment="item" :comment_repo="comment_repo" @updated="onCommentUpdated" @destroyed="onCommentDestroyed" @modal="(...args) => comment_dialog.show(...args)" />
        </template>
        <template v-else-if="(item instanceof IssueActivity)">
          <IssueActivityInfo :issue="issue_info" :issue_activity="item" />
        </template>
        <template v-else-if="(item instanceof IssueRelationship)">
          <IssueRelationshipInfo :readonly="readonly" :issue_info="issue_info" :issue_relationship="item" @updated="onIssueInfoUpdated" />
        </template>
      </div>

      <Card v-if="!readonly">
        <CardHeader>
          <CardTitle>提供更多信息</CardTitle>
        </CardHeader>
        <CardContent>
          <ActionerAlert :actioner="actioner" />
          <div class="flex items-center gap-x-2">
            <Button v-if="allow('create', Comment)" @click="comment_dialog.show(IssueCommentCreateDialogContent, issue_info)">
              <i class="far fa-comment fa-fw" /> 新增评论
            </Button>
            <Button @click="issue_info_dialog.show(IssueInfoRelationshipNewDialogContent)">
              <i class="far fa-link fa-fw" /> 关联其它问题
            </Button>
            <Button v-if="allow('create', IssueSurvey)" @click="issue_info_dialog.show(IssueSurveyCreateDialogContent)">
              <i class="far fa-file-lines fa-fw" /> 新增问题模版
            </Button>

            <template v-if="allow('manage', issue_info) || issue_info.assignee_id == profile.member_id">
              <template v-if="issue_info.assignee && ['confirmed', 'processing', 'processed'].includes(issue_info.state)">
                <ButtonGroup class="ms-auto">
                  <template v-if="issue_info.state == 'confirmed'">
                    <Button preset="outline" variant="secondary" @click.prevent="changeIssueState('processing')">
                      <span class="me-1">设置为</span><IssueStateBadge state="processing" />
                    </Button>
                    <Button preset="outline" variant="secondary" @click.prevent="changeIssueState('processed')">
                      <span class="me-1">设置为</span><IssueStateBadge state="processed" />
                    </Button>
                  </template>

                  <template v-if="issue_info.state == 'processing'">
                    <Button preset="outline" variant="secondary" disabled @click.prevent="changeIssueState('processing')">
                      已设置 <IssueStateBadge state="processing" />
                    </Button>
                    <Button preset="outline" variant="secondary" @click.prevent="changeIssueState('processed')">
                      <span class="me-1">设置为</span><IssueStateBadge state="processed" />
                    </Button>
                  </template>

                  <template v-if="issue_info.state == 'processed'">
                    <Button preset="outline" variant="secondary" @click.prevent="changeIssueState('processing')">
                      <span class="me-1">设置为</span><IssueStateBadge state="processing" />
                    </Button>
                    <Button preset="outline" variant="secondary" disabled @click.prevent="changeIssueState('processed')">
                      已设置 <IssueStateBadge state="processed" />
                    </Button>
                  </template>
                </ButtonGroup>
              </template>
            </template>

            <template v-if="allow('manage', issue_info) && issue_info.state == 'pending'">
              <ButtonGroup class="ms-auto">
                <Button preset="outline" variant="secondary" @click.prevent="issue_comment_create_dialog.show(IssueWaitingDialogContent, issue_info)">
                  <span class="me-1">设置为</span><IssueStateBadge state="waiting" />
                </Button>
                <Button preset="outline" variant="secondary" @click.prevent="issue_info_dialog.show(IssueConfirmDialogContent)">
                  <span class="me-1">设置为</span><IssueStateBadge state="confirmed" />
                </Button>
              </ButtonGroup>
            </template>

            <template v-if="allow('manage', issue_info) || issue_info.creator_id == profile.member_id">
              <template v-if="issue_info.state == 'resolved' && !issue_info.archived_at">
                <ButtonGroup class="ms-auto">
                  <Button preset="outline" variant="secondary" size="sm" @click.prevent="issue_info_resolve_dialog.show(IssueResolveDialogContent)">
                    <span class="me-1">设置为</span><IssueStateBadge state="archived" text="已完结" />
                  </Button>

                  <Button preset="outline" variant="secondary" size="sm" @click.prevent="issue_info_dialog.show(IssueUnresolveDialogContent)">
                    <span class="me-1">设置为</span><IssueStateBadge state="pending" text="未解决" />
                  </Button>
                </ButtonGroup>
              </template>
              <template v-if="issue_info.state == 'closed' && !issue_info.archived_at">
                <Button preset="outline" variant="silence" size="sm" @click.prevent="issue_info_dialog.show(IssueResolveDialogContent)">
                  <span class="me-1">设置为</span><IssueStateBadge state="archived" text="确认完结" />
                </Button>
              </template>
            </template>
          </div>
        </CardContent>
      </Card>
    </div>
    <IssueDetailsSideBar :readonly="readonly" class="w-full md:w-1/4" :issue_info="issue_info" @updated="onIssueInfoUpdated" />
  </div>

  <teleport to="body">
    <BlankDialog ref="comment_dialog" @created="onCommentCreated" @updated="onCommentUpdated" @destroyed="onCommentDestroyed" />
    <BlankDialog ref="issue_info_dialog" @updated="onIssueInfoUpdated" v-bind="{ issue_info }" />
    <BlankDialog ref="issue_comment_create_dialog" @created="onIssueCommentCreated" v-bind="{ issue_info }" />
    <BlankDialog ref="issue_info_resolve_dialog" @updated="onIssueInfoUpdated" v-bind="{ issue_info }" />
  </teleport>
</template>

<script setup lang="ts">
import { Actioner } from "@/components/Actioner"
import ActionerAlert from "@/components/ActionerAlert.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import * as q from '@/requests'
import { Comment, CommentRepo, Issue, IssueActivity, IssueInfo, IssueRelationship, IssueSurvey } from "@/models"
import { usePageStore } from "@/store"
import _ from "lodash"
import { computed, getCurrentInstance, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import IssueActivityInfo from "./IssueActivityInfo.vue"
import IssueComment from "./IssueComment.vue"
import IssueCommentCreateDialogContent from "./IssueCommentCreateDialogContent.vue"
import IssueConfirmDialogContent from "./IssueConfirmDialogContent.vue"
import IssueContent from "./IssueContent.vue"
import IssueDetailsSideBar from "./IssueDetailsSideBar.vue"
import IssueInfoRelationshipNewDialogContent from "./IssueInfoRelationshipNewDialogContent.vue"
import IssueRelatedTask from "./IssueRelatedTask.vue"
import IssueRelationshipInfo from "./IssueRelationshipInfo.vue"
import IssueResolveDialogContent from "./IssueResolveDialogContent.vue"
import IssueSurveyCard from "./IssueSurveyCard.vue"
import IssueSurveyCreateDialogContent from "./IssueSurveyCreateDialogContent.vue"
import IssueUnresolveDialogContent from "./IssueUnresolveDialogContent.vue"
import IssueWaitingDialogContent from "./IssueWaitingDialogContent.vue"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import BlankDialog from "$vendor/ui/BlankDialog.vue"
import Button from "$vendor/ui/button/Button.vue"
import ButtonGroup from "$vendor/ui/button/ButtonGroup.vue"

const comment_dialog = ref(null as InstanceType<typeof BlankDialog>)
const issue_info_dialog = ref(null as InstanceType<typeof BlankDialog>)
const issue_comment_create_dialog = ref(null as InstanceType<typeof BlankDialog>)
const issue_info_resolve_dialog = ref(null as InstanceType<typeof BlankDialog>)

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const project_id = _.toInteger(params.project_id)
const page = usePageStore()
const profile = page.inProject().profile
const allow = profile.allow

const issue_info = ref(await new q.bug.IssueInfoReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = params.issue_id
}).perform())
page.meta.title = `#${issue_info.value.id} ${issue_info.value.title}`

const readonly = computed(() => issue_info.value.project_id.toString() !== params.project_id)
const comments = ref(await new q.bug.IssueCommentReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_info.value.id
}).perform())

const comment_repo = computed(() => {
  return new CommentRepo().setup(comments.value)
})

const timelines = computed(() => {
  return _.orderBy([ ...comment_repo.value.parent_id.findAll(null), ...issue_info.value.activities, ...issue_info.value.target_relationships, ...issue_info.value.source_relationships ], [ "created_at" ])
})

function onIssueInfoUpdated(new_issue_info: IssueInfo) {
  issue_info.value = new_issue_info
}

function onCommentCreated(comment: Comment) {
  comments.value.push(comment)
}

function onCommentDestroyed(comment: Comment) {
  const index = comments.value.findIndex(it => it.id === comment.id)
  comments.value.splice(index, 1)
}

async function onCommentUpdated(comment: Comment) {
  const index = comments.value.findIndex(it => it.id === comment.id)
  comments.value[index] = comment
}

function onIssueCommentCreated(a_issue_info: IssueInfo, a_comment: Comment) {
  issue_info.value = a_issue_info
  comments.value.push(a_comment)
}

async function onIssueConvert(a_issue_info: IssueInfo) {
  await new q.bug.IssueBodyReq.Convert().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_id = a_issue_info.id
  }).perform()

  router.go(0)
}

const actioner = Actioner.build()

async function changeIssueState(state: string) {
  actioner.perform(async function() {
    const a_issue_info = await new q.bug.IssueInfoReq.Process().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_id = params.issue_id
    }).perform({ state })

    issue_info.value = a_issue_info
  })
}
</script>
