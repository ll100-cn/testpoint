<template>
  <PageHeader>
    <PageTitle class="me-1">#{{ issue_box.issue.id }} {{ issue_box.issue.titleWithPriority() }}</PageTitle>
    <span class="me-1">
      <IssueStateBadge :state="issue_box.issue.state" />
    </span>
    <div class="flex ms-auto space-x-3 items-center">
      <Button v-if="!readonly && allow('update', Issue)" :to="`/projects/${project_id}/issues/${params.issue_id}/edit`">修改</Button>
      <Button variant="destructive" v-if="!readonly && allow('manage', Issue)" :to="`/projects/${project_id}/issues/${issue_box.issue.id}/merge`">合并</Button>
    </div>
  </PageHeader>

  <div v-if="issue_box.issue.archived_at" class="alert alert-danger">
    该问题已完结
  </div>

  <div class="flex gap-x-6">
    <div class="flex-1 space-y-4">
      <IssueRelatedTask v-if="issue_box.issue.task" :task="issue_box.issue.task" :project_id="project_id" />
      <IssueContent :readonly="readonly" :issue_box="issue_box" @updated="onIssueUpdated" @convert="onIssueConvert" />
      <IssueSurveyCard :readonly="readonly" :issue_box="issue_box" v-if="issue_box.surveys?.length > 0" @modal="(...args) => issue_dialog.show(...args)" />

      <div v-for="item in timelines" class="mb-2">
        <template v-if="(item instanceof Comment)">
          <IssueComment :readonly="readonly" :issue_box="issue_box" :comment_box="CommentBoxImpl.from(item)" :comment_repo="comment_repo" @updated="onCommentUpdated" @destroyed="onCommentDestroyed" @modal="(...args) => comment_dialog.show(...args)" />
        </template>
        <template v-else-if="(item instanceof IssueActivity)">
          <IssueActivityInfo :issue_box="issue_box" :issue_activity="item" />
        </template>
        <template v-else-if="(item instanceof IssueRelationship)">
          <IssueRelationshipInfo :readonly="readonly" :issue_box="issue_box" :issue_relationship="item" @updated="onIssueUpdated" />
        </template>
      </div>

      <Card v-if="!readonly">
        <CardHeader>
          <CardTitle>提供更多信息</CardTitle>
        </CardHeader>
        <CardContent>
          <ActionerAlert :actioner="actioner" />
          <div class="flex items-center gap-x-2">
            <Button v-if="allow('create', Comment)" @click="comment_dialog.show(IssueCommentCreateDialogContent, issue_box)">
              <i class="far fa-comment fa-fw" /> 新增评论
            </Button>
            <Button v-if="allow('manage', issue_box.issue)" @click="issue_dialog.show(IssueRelationshipNewDialogContent)">
              <i class="far fa-link fa-fw" /> 关联其它问题
            </Button>
            <Button v-if="allow('create', IssueSurvey)" @click="issue_dialog.show(IssueSurveyCreateDialogContent)">
              <i class="far fa-file-lines fa-fw" /> 新增问题模版
            </Button>

            <template v-if="allow('manage', issue_box.issue) || issue_box.issue.assignee_id == profile.member_id">
              <template v-if="issue_box.issue.assignee && ['confirmed', 'processing', 'processed'].includes(issue_box.issue.state)">
                <ButtonGroup class="ms-auto">
                  <template v-if="issue_box.issue.state == 'confirmed'">
                    <Button preset="outline" variant="secondary" @click.prevent="changeIssueState('processing')">
                      <span class="me-1">设置为</span><IssueStateBadge state="processing" />
                    </Button>
                    <Button preset="outline" variant="secondary" @click.prevent="changeIssueState('processed')">
                      <span class="me-1">设置为</span><IssueStateBadge state="processed" />
                    </Button>
                  </template>

                  <template v-if="issue_box.issue.state == 'processing'">
                    <Button preset="outline" variant="secondary" disabled @click.prevent="changeIssueState('processing')">
                      已设置 <IssueStateBadge state="processing" />
                    </Button>
                    <Button preset="outline" variant="secondary" @click.prevent="changeIssueState('processed')">
                      <span class="me-1">设置为</span><IssueStateBadge state="processed" />
                    </Button>
                  </template>

                  <template v-if="issue_box.issue.state == 'processed'">
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

            <template v-if="allow('manage', issue_box.issue) && issue_box.issue.state == 'pending'">
              <ButtonGroup class="ms-auto">
                <Button preset="outline" variant="secondary" @click.prevent="issue_state_dialog.show(IssueWaitingDialogContent, issue_box)">
                  <span class="me-1">设置为</span><IssueStateBadge state="waiting" />
                </Button>
                <Button preset="outline" variant="secondary" @click.prevent="issue_dialog.show(IssueConfirmDialogContent)">
                  <span class="me-1">设置为</span><IssueStateBadge state="confirmed" />
                </Button>
              </ButtonGroup>
            </template>

            <template v-if="allow('manage', issue_box.issue) || issue_box.issue.creator_id == profile.member_id">
              <template v-if="issue_box.issue.state == 'resolved' && !issue_box.issue.archived_at">
                <ButtonGroup class="ms-auto">
                  <Button preset="outline" variant="secondary" size="sm" @click.prevent="issue_dialog.show(IssueResolveDialogContent)">
                    <span class="me-1">设置为</span><IssueStateBadge state="archived" text="已完结" />
                  </Button>

                  <Button preset="outline" variant="secondary" size="sm" @click.prevent="issue_state_dialog.show(IssueUnresolveDialogContent)">
                    <span class="me-1">设置为</span><IssueStateBadge state="pending" text="未解决" />
                  </Button>
                </ButtonGroup>
              </template>
              <template v-if="issue_box.issue.state == 'closed' && !issue_box.issue.archived_at">
                <Button preset="outline" variant="silence" size="sm" @click.prevent="issue_dialog.show(IssueResolveDialogContent)">
                  <span class="me-1">设置为</span><IssueStateBadge state="archived" text="确认完结" />
                </Button>
              </template>
            </template>
          </div>
        </CardContent>
      </Card>
    </div>
    <IssueDetailsSideBar :readonly="readonly" class="w-full md:w-1/4" :issue_box="issue_box" @updated="onIssueUpdated" />
  </div>

  <teleport to="body">
    <IssueCommentDialog ref="comment_dialog" @created="onCommentCreated" @updated="onCommentUpdated" @destroyed="onCommentDestroyed" />
    <IssueDialog ref="issue_dialog" @updated="onIssueUpdated" v-bind="{ issue_box }" />
    <IssueStateDialog ref="issue_state_dialog" @created="onIssueCommentCreated" v-bind="{ issue_box }" />
  </teleport>
</template>

<script setup lang="ts">
import { Actioner } from "@/components/Actioner"
import ActionerAlert from "@/components/ActionerAlert.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import * as q from '@/requests'
import { Comment, type CommentBox, CommentBoxImpl, CommentRepo, Issue, IssueActivity, type IssueBox, IssueRelationship, IssueSurvey } from "@/models"
import { usePageStore } from "@/store"
import _ from "lodash"
import { computed, getCurrentInstance, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import IssueActivityInfo from "./IssueActivityInfo.vue"
import IssueComment from "./IssueComment.vue"
import IssueCommentCreateDialogContent from "./IssueCommentCreateDialogContent.vue"
import IssueContent from "./IssueContent.vue"
import IssueDetailsSideBar from "./IssueDetailsSideBar.vue"
import IssueRelatedTask from "./IssueRelatedTask.vue"
import IssueRelationshipInfo from "./IssueRelationshipInfo.vue"
import IssueRelationshipNewDialogContent from "./IssueRelationshipNewDialogContent.vue"
import IssueResolveDialogContent from "./IssueResolveDialogContent.vue"
import IssueSurveyCard from "./IssueSurveyCard.vue"
import IssueSurveyCreateDialogContent from "./IssueSurveyCreateDialogContent.vue"
import IssueUnresolveDialogContent from "./IssueUnresolveDialogContent.vue"
import IssueWaitingDialogContent from "./IssueWaitingDialogContent.vue"
import IssueConfirmDialogContent from "./IssueConfirmDialogContent.vue"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import BlankDialog from "@/components/BlankDialog.vue"
import Button from "$ui/button/Button.vue"
import ButtonGroup from "$ui/button-group/ButtonGroup.vue"
import { useQueryLine } from '@/lib/useQueryLine'
import type { IssueCommentFrameComponent } from "@/components/IssueCommentFrame"
import type { IssueFrameComponent } from "@/components/IssueFrame"
import type { IssueStateFrameComponent } from "@/components/IssueStateFrame"

const IssueCommentDialog = BlankDialog as typeof BlankDialog & IssueCommentFrameComponent
const comment_dialog = ref(null! as InstanceType<typeof BlankDialog & IssueCommentFrameComponent>)
const IssueDialog = BlankDialog as typeof BlankDialog & IssueFrameComponent
const issue_dialog = ref(null! as InstanceType<typeof BlankDialog & IssueFrameComponent>)
const IssueStateDialog = BlankDialog as typeof BlankDialog & IssueStateFrameComponent
const issue_state_dialog = ref(null! as InstanceType<typeof BlankDialog & IssueStateFrameComponent>)

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const project_id = _.toInteger(params.project_id)
const page = usePageStore()
const profile = page.inProject()!.profile
const allow = profile.allow

const { data: issue_box } = line.request(q.bug.issues.Get('+info'), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = params.issue_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

page.meta.title = `#${issue_box.value.issue.id} ${issue_box.value.issue.title}`

const readonly = computed(() => issue_box.value.issue.project_id.toString() !== params.project_id)
const { data: comment_page } = line.request(q.bug.issue_comments.List(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_id = issue_box.value.issue.id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const comment_repo = computed(() => {
  return new CommentRepo().setup(comment_page.value.list.map(it => it.comment))
})

const timelines = computed(() => {
  return _.orderBy([ ...comment_repo.value.parent_id.findAll(null), ...issue_box.value.activities, ...issue_box.value.target_relationships, ...issue_box.value.source_relationships ], [ "created_at" ])
})

function onIssueUpdated(new_issue_box: IssueBox) {
  console.log("onIssueUpdated", new_issue_box.surveys.length)
  issue_box.value = new_issue_box
}

function onCommentCreated(comment_box: CommentBox) {
  comment_page.value.list.push(comment_box)
}

function onCommentDestroyed(comment_box: CommentBox) {
  const index = comment_page.value.list.findIndex(it => it.comment.id === comment_box.comment.id)
  comment_page.value.list.splice(index, 1)
}

async function onCommentUpdated(comment_box: CommentBox) {
  const index = comment_page.value.list.findIndex(it => it.comment.id === comment_box.comment.id)
  comment_page.value.list[index] = comment_box
}

function onIssueCommentCreated(a_issue_box: IssueBox, a_comment_box: CommentBox) {
  issue_box.value = a_issue_box
  comment_page.value.list.push(a_comment_box)
}

const { mutateAsync: convert_issue_body_action } = line.request(q.bug.issue_bodies.Convert(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: process_issue_action } = line.request(q.bug.issues.Process('+info'), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function onIssueConvert(a_issue_box: IssueBox) {
  await convert_issue_body_action({
    interpolations: { project_id, issue_id: a_issue_box.issue.id }
  })

  router.go(0)
}

const actioner = Actioner.build()

async function changeIssueState(state: string) {
  actioner.perform(async function() {
    const a_issue_box = await process_issue_action({
      interpolations: { project_id, issue_id: params.issue_id },
      body: { state }
    })

    issue_box.value = a_issue_box
  })
}
</script>
