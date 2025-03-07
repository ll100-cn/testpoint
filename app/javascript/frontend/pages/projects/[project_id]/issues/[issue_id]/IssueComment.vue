<template>
  <Card>
    <CardHeader :class="{ 'bg-destructive/10': comment.display == 'important' }">
      <MemberLabel :member="comment.member" class="me-1" />

      <span class="ms-1 text-sm text-muted">添加于 {{ h.datetime(comment.created_at) }}</span>

      <span class="ms-1 text-sm text-body-tertiary">[{{ comment.id }}]</span>

      <template #actions>
        <Button preset="ghost" variant="secondary" size="sm" v-if="display == 'collapsed'" @click.prevent="changeDisplay()">展开</Button>

        <MoreDropdown>
          <DropdownMenuItem v-if="!readonly && allow('create', Comment)" @click.prevent="emit('modal', IssueCommentReplyDialogContent, issue, comment)">回复</DropdownMenuItem>

          <template v-if="!readonly && allow('update', comment)">
            <DropdownMenuItem @click.prevent="emit('modal', IssueCommentEditDialogContent, issue, comment)">修改</DropdownMenuItem>
            <DropdownMenuItem v-if="children.length == 0" @click.prevent="emit('modal', IssueCommentConvertDialogContent, issue, comment)">关联</DropdownMenuItem>
            <!-- <DropdownMenuItem v-if="allow('destroy', comment)" @click.prevent="deleteComment">删除</DropdownMenuItem> -->

            <DropdownMenuSeparator />

            <template v-for="option in COMMENT_DISPLAY_OPTIONS">
              <DropdownMenuItem v-if="option.value != comment.display" @click.prevent="updateComment({ display: option.value })">
                设为: {{ option.label }}
              </DropdownMenuItem>
            </template>
          </template>
        </MoreDropdown>
      </template>
    </CardHeader>

    <CardContent :id="content_id" :class="{ hidden: display == 'collapsed' }">
      <ContentBody :body="comment" :editable="!readonly && allow('update', comment)" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
      <Callout class="mt-3 py-1" v-if="children.length > 0">
        <template v-for="(child, index) in children">
          <div class="mt-4" v-if="index != 0"></div>
          <IssueCommentReply :readonly="readonly" :issue="issue" :comment="child" @destroyed="emit('destroyed', $event)" @modal="(...args) => emit('modal', ...args)" />
        </template>
      </Callout>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import useRequestList from '@bbb/useRequestList'
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { Attachment, Comment, CommentRepo, Issue } from "@/models"
import { usePageStore } from "@/store"
import { useSessionStore } from "@/store/session"
import _ from "lodash"
import { type Component, computed, getCurrentInstance, ref } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueCommentEditDialogContent from "./IssueCommentEditDialogContent.vue"
import IssueCommentReply from "./IssueCommentReply.vue"
import IssueCommentReplyDialogContent from "./IssueCommentReplyDialogContent.vue"
import IssueCommentConvertDialogContent from "./IssueCommentConvertDialogContent.vue"
import { COMMENT_DISPLAY_OPTIONS } from "@/constants"
import { Callout, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '@/ui'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui'
import Button from "@/ui/button/Button.vue"

const reqs = useRequestList()
const store = useSessionStore()
const user = store.account!.user
const page = usePageStore()
const allow = page.inProject()!.allow

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

const display = ref(props.comment.display)
function changeDisplay() {
  display.value = display.value == 'collapsed' ? 'normal' : 'collapsed'
}

const children = computed(() => {
  return props.comment_repo.parent_id.findAll(props.comment.id).sort((a, b) => a.created_at > b.created_at ? 1 : -1)
})

const content_id = _.uniqueId("content_")

async function deleteComment() {
  if (!confirm("确认删除该评论？")) {
    return
  }
  await reqs.add(q.bug.issue_comments.Destroy).setup(req => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  emit("destroyed", props.comment)
}

async function updateComment(data: Record<string, any>) {
  const comment = await reqs.add(q.bug.issue_comments.Update).setup(req => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform(data)

  display.value = comment.display
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
