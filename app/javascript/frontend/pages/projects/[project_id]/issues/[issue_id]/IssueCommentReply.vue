<template>
  <div class="text-sm">
    <div class="flex items-center gap-x-2 mb-2">
      <MemberLabel :member="comment.member" />

      <span class="text-muted">回复于 {{ h.datetime(comment.created_at) }}</span>

      <MoreDropdown class="ms-auto">
        <DropdownMenuItem v-if="!readonly && comment.member.user_id == user.id && allow('update', comment)" @click.prevent="emit('modal', IssueCommentEditDialogContent, issue, comment)">修改</DropdownMenuItem>
        <DropdownMenuItem v-if="!readonly && allow('destroy', comment)" @click.prevent="deleteComment">删除</DropdownMenuItem>
        <DropdownMenuItem @click.prevent="emit('modal', IssueCommentConvertDialogContent, issue, comment)">关联</DropdownMenuItem>
      </MoreDropdown>
    </div>

    <ContentBody :body="comment" :editable="!readonly && allow('update', comment)" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
  </div>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { Attachment, Comment, Issue } from "@/models"
import { usePageStore } from "@/store"
import { useSessionStore } from "@/store/session"
import { Component, getCurrentInstance } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueCommentEditDialogContent from "./IssueCommentEditDialogContent.vue"
import IssueCommentConvertDialogContent from "./IssueCommentConvertDialogContent.vue"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui'

const proxy = getCurrentInstance()!.proxy as any
const store = useSessionStore()
const user = store.account.user
const page = usePageStore()
const allow = page.inProject().allow

const props = defineProps<{
  issue: Issue
  comment: Comment
  readonly: boolean
}>()

const emit = defineEmits<{
  changed: [ Comment ]
  destroyed: [ Comment ]

  modal: [ component: Component, ...args: any[] ]
}>()

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

async function deleteComment() {
  if (!confirm("确认删除该评论？")) {
    return
  }
  await new q.bug.issue_comments.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  emit("destroyed", props.comment)
}

</script>
