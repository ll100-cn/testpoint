<template>
  <div>
    <div class="d-flex align-items-baseline text-muted" v-if="comment.collapsed">
      <MemberLabel :member="comment.member" class="me-1" />
      <span>在 {{ utils.humanize(comment.created_at, DATE_LONG_FORMAT) }} 发表了评论</span>
      <a :href="`#${content_id}`" data-bs-toggle="collapse" class="small text-muted ms-auto">展开</a>
    </div>
    <div :id="content_id" class="collapse" :class="{ show: !comment.collapsed }">
      <div class="card">
        <div class="card-header d-flex align-items-center">
          <MemberLabel :member="comment.member" class="me-1" />

          <span class="ms-1 small text-muted">添加于 {{ utils.humanize(comment.created_at, DATE_LONG_FORMAT) }}</span>

          <MoreDropdown class="ms-auto">
            <a class="small dropdown-item" href="#" @click.prevent="emit('modal', IssueCommentReplyFrame, issue, comment)">回复</a>
            <template v-if="comment.member.user_id == user.id">
              <a class="small dropdown-item" href="#" @click="emit('modal', IssueCommentEditFrame, issue, comment)">修改</a>
              <!-- <a class="small dropdown-item" @click.prevent="deleteComment" href="#">删除</a> -->
              <a v-if="comment.collapsed" class="small dropdown-item" @click.prevent="foldComment" href="#">显示</a>
              <a v-else class="small dropdown-item" href="#" @click.prevent="unfoldComment">隐藏</a>
            </template>
          </MoreDropdown>
        </div>
        <div class="card-body">
          <ContentBody :body="comment" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
          <div class="x-callout mt-3 py-1" v-if="children.length > 0">
            <template v-for="(child, index) in children">
              <div class="mt-4" v-if="index != 0"></div>
              <IssueCommentReply :issue="issue" :comment="child" @destroyed="emit('destroyed', $event)" @modal="(...args) => emit('modal', ...args)" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import { DATE_LONG_FORMAT } from "@/constants"
import * as requests from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Attachment, Comment, CommentRepo, Issue } from "@/models"
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import { Component, computed, getCurrentInstance } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueCommentEditFrame from "./IssueCommentEditFrame.vue"
import IssueCommentReply from "./IssueCommentReply.vue"
import IssueCommentReplyFrame from "./IssueCommentReplyFrame.vue"

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const user = store.account.user

const props = defineProps<{
  issue: Issue
  comment: Comment
  comment_repo: CommentRepo
}>()

const emit = defineEmits<{
  destroyed: [ Comment ]
  changed: [ Comment ]

  modal: [ component: Component, ...args: any[] ]
}>()

const children = computed(() => {
  return props.comment_repo.parent_id.findAll(props.comment.id)
})

const content_id = _.uniqueId("content_")

async function deleteComment() {
  if (!confirm("确认删除该评论？")) {
    return
  }
  await new requests.IssueCommentReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  emit("destroyed", props.comment)
}

async function foldComment() {
  const comment = await new requests.IssueCommentReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform({
    collapsed: false
  })

  emit('changed', comment)
}

async function unfoldComment() {
  const comment = await new requests.IssueCommentReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform({
    collapsed: true
  })

  emit('changed', comment)
}

function onAttachmentUpdated(attachment: Attachment) {
  const index = props.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment.attachments[index] = attachment
  emit('changed', props.comment)
}

function onAttachmentDestroyed(attachment: Attachment) {
  const index = props.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment.attachments.splice(index, 1)
  emit('changed', props.comment)
}
</script>
