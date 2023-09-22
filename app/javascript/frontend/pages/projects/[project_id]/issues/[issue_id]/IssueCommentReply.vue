<template>
  <li class="list-group-item px-0 small">
    <div class="d-flex mb-2 align-items-center x-actions x-spacer-2">
      <MemberLabel :member="comment.member" />

      <span class="text-muted ">回复评论：</span>

      <MoreDropdown class="ms-auto">
        <a v-if="comment.member.user_id == user.id" class="dropdown-item" href="#" @click.prevent="emit('modal', IssueCommentEditFrame, issue, comment)">修改</a>
        <a class="dropdown-item" @click.prevent="deleteComment" href="#">删除</a>
      </MoreDropdown>
    </div>
    <PageContent :content="comment.content" />
    <AttachmentBox :attachments="comment.attachments" @edited="onAttachmentChanged" @deleted="onAttachmentDestroyed" />
    <span class="text-muted">回复于 {{ utils.humanize(comment.created_at, DATE_SHORT_FORMAT) }}</span>
  </li>
</template>

<script setup lang="ts">
import AttachmentBox from "@/components/AttachmentBox.vue"
import MemberLabel from "@/components/MemberLabel.vue"
import PageContent from "@/components/PageContent.vue"
import { DATE_SHORT_FORMAT } from "@/constants"
import * as utils from "@/lib/utils"
import * as requests from '@/lib/requests'
import { Attachment, Comment, Issue } from "@/models"
import { useSessionStore } from "@/store/session"
import { Component, getCurrentInstance } from "vue"
import IssueCommentEditFrame from "./IssueCommentEditFrame.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const user = store.account.user

const props = defineProps<{
  issue: Issue
  comment: Comment
}>()

const emit = defineEmits<{
  changed: [ Comment ]
  destroyed: [ Comment ]

  modal: [ component: Component, ...args: any[] ]
}>()

function onAttachmentChanged(attachment: Attachment) {
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
  await new requests.IssueCommentReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  emit("destroyed", props.comment)
}

</script>
