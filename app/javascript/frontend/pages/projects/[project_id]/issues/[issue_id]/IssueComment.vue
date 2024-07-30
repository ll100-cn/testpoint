<template>
  <Card>
    <CardHeader :style="comment.display == 'important' ? { backgroundColor: 'var(--bs-danger-bg-subtle)' } : {}">
      <MemberLabel :member="comment.member" class="me-1" />

      <span class="ms-1 small text-muted">添加于 {{ h.datetime(comment.created_at) }}</span>

      <span class="ms-1 small text-body-tertiary">[{{ comment.id }}]</span>

      <template #actions>
        <a v-if="comment.display == 'collapsed'" :href="`#${content_id}`" data-bs-toggle="collapse" class="btn btn-sm">展开</a>
        <MoreDropdown>
          <a v-if="!readonly && allow('create', Comment)" class="small dropdown-item" href="#" @click.prevent="emit('modal', IssueCommentReplyDialogContent, issue, comment)">回复</a>
          <template v-if="!readonly && allow('update', comment)">
            <a class="small dropdown-item" href="#" @click="emit('modal', IssueCommentEditDialogContent, issue, comment)">修改</a>
            <a v-if="children.length == 0" class="small dropdown-item" href="#" @click="emit('modal', IssueCommentConvertDialogContent, issue, comment)">关联</a>
            <!-- <a v-if="allow('destroy', comment)" class="small dropdown-item" @click.prevent="deleteComment" href="#">删除</a> -->

            <hr class="dropdown-divider">

            <template v-for="option in COMMENT_DISPLAY_OPTIONS">
              <a v-if="option.value != comment.display" class="small dropdown-item" href="#" @click.prevent="updateComment({ display: option.value })">
                设为: {{ option.label }}
              </a>
            </template>
          </template>
        </MoreDropdown>
      </template>
    </CardHeader>
    <CardContent :id="content_id" class="collapse" :class="{ show: comment.display !== 'collapsed' }">
      <ContentBody :body="comment" :editable="!readonly && allow('update', comment)" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
      <div class="x-callout mt-3 py-1" v-if="children.length > 0">
        <template v-for="(child, index) in children">
          <div class="mt-4" v-if="index != 0"></div>
          <IssueCommentReply :readonly="readonly" :issue="issue" :comment="child" @destroyed="emit('destroyed', $event)" @modal="(...args) => emit('modal', ...args)" />
        </template>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { Attachment, Comment, CommentRepo, Issue } from "@/models"
import { usePageStore } from "@/store"
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import { Component, computed, getCurrentInstance } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueCommentEditDialogContent from "./IssueCommentEditDialogContent.vue"
import IssueCommentReply from "./IssueCommentReply.vue"
import IssueCommentReplyDialogContent from "./IssueCommentReplyDialogContent.vue"
import IssueCommentConvertDialogContent from "./IssueCommentConvertDialogContent.vue"
import { COMMENT_DISPLAY_OPTIONS } from "@/constants"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const user = store.account.user
const page = usePageStore()
const allow = page.inProject().allow

const props = defineProps<{
  issue: Issue
  comment: Comment
  comment_repo: CommentRepo
  readonly: boolean
}>()

const emit = defineEmits<{
  destroyed: [ Comment ]
  updated: [ Comment ]

  modal: [ component: Component, ...args: any[] ]
}>()

const children = computed(() => {
  return props.comment_repo.parent_id.findAll(props.comment.id).sort((a, b) => a.created_at > b.created_at ? 1 : -1)
})

const content_id = _.uniqueId("content_")

async function deleteComment() {
  if (!confirm("确认删除该评论？")) {
    return
  }
  await new q.bug.IssueCommentReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  emit("destroyed", props.comment)
}

async function updateComment(data: Record<string, any>) {
  const comment = await new q.bug.IssueCommentReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform(data)

  emit('updated', comment)
}

function onAttachmentUpdated(attachment: Attachment) {
  const index = props.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment.attachments[index] = attachment
  emit('updated', props.comment)
}

function onAttachmentDestroyed(attachment: Attachment) {
  const index = props.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment.attachments.splice(index, 1)
  emit('updated', props.comment)
}
</script>
