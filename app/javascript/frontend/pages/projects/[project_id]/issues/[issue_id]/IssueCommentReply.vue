<template>
  <div class="text-sm">
    <div class="flex items-center gap-x-2 mb-2">
      <MemberLabel :member="comment_box.comment.member" />

      <span class="text-muted">回复于 {{ h.datetime(comment_box.comment.created_at) }}</span>

      <MoreDropdown class="ms-auto">
        <DropdownMenuItem v-if="!readonly && comment_box.comment.member.user_id == user.id && allow('update', comment_box.comment)" @click.prevent="emit('modal', IssueCommentEditDialogContent, issue_box, comment_box)">修改</DropdownMenuItem>
        <DropdownMenuItem v-if="!readonly && allow('destroy', comment_box.comment)" @click.prevent="deleteComment">删除</DropdownMenuItem>
        <DropdownMenuItem @click.prevent="emit('modal', IssueCommentConvertDialogContent, issue_box, comment_box)">关联</DropdownMenuItem>
      </MoreDropdown>
    </div>

    <ContentBody :body="comment_box.comment" :editable="!readonly && allow('update', comment_box.comment)" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
  </div>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import useRequestList from '@/lib/useRequestList'
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import { Attachment, Comment, CommentBox, Issue, IssueBox } from "@/models"
import { usePageStore } from "@/store"
import { useSessionStore } from "@/store/session"
import { type Component } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueCommentEditDialogContent from "./IssueCommentEditDialogContent.vue"
import IssueCommentConvertDialogContent from "./IssueCommentConvertDialogContent.vue"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'

const reqs = useRequestList()
const store = useSessionStore()
const user = store.account!.user
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  issue_box: IssueBox
  comment_box: CommentBox
  readonly: boolean
}>()

const emit = defineEmits<{
  changed: [ CommentBox ]
  destroyed: [ CommentBox ]

  modal: [ component: Component, ...args: any[] ]
}>()

function onAttachmentUpdated(attachment: Attachment) {
  const index = props.comment_box.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment_box.comment.attachments[index] = attachment
  emit('changed', props.comment_box)
}

function onAttachmentDestroyed(attachment: Attachment) {
  const index = props.comment_box.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment_box.comment.attachments.splice(index, 1)
  emit('changed', props.comment_box)
}

async function deleteComment() {
  if (!confirm("确认删除该评论？")) {
    return
  }
  await reqs.add(q.bug.issue_comments.Destroy).setup(req => {
    req.interpolations.project_id = props.issue_box.issue.project_id
    req.interpolations.issue_id = props.issue_box.issue.id
    req.interpolations.comment_id = props.comment_box.comment.id
  }).perform()

  emit("destroyed", props.comment_box)
}

</script>
