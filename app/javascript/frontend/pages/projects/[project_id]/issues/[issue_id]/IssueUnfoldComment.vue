<template>
  <div class="issue-overview">
    <div class="overview text-muted">
      <span>{{ comment.member.name }} 在 {{ utils.humanize(comment.created_at, DATE_LONG_FORMAT) }} 发表了评论</span>
      <a :href="`#collapse_comment_${comment.id}`" data-bs-toggle="collapse" class="small text-muted float-end">展开</a>
    </div>
    <div :id="`collapse_comment_${comment.id}`" class="issue-comment collapse">
      <IssueComment
        :issue="issue"
        :comment="comment"
        :child_comment_mapping="child_comment_mapping"
        @add-comment="emits('addComment', $event)"
        @refresh-comment="emits('refreshComment')"
        @update-comment="emits('updateComment', $event)"
        @destroy-comment="emits('destroyComment', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DATE_LONG_FORMAT } from '@/constants'
import * as utils from "@/lib/utils"
import { Comment, Issue } from "@/models"

import IssueComment from "./IssueComment.vue"

const props = defineProps<{
  comment: Comment
  issue: Issue
  child_comment_mapping: Record<string, Comment[]>
}>()

const emits = defineEmits<{
  destroyComment: [comment: Comment]
  updateComment: [comment: Comment]
  addComment: [comment: Comment]
  refreshComment: []
}>()

</script>
