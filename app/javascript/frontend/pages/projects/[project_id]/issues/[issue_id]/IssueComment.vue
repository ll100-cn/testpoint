<template>
  <Card>
    <CardHeader :class="{ 'bg-destructive/10': comment_box.comment.display == 'important' }">
      <MemberLabel :member="comment_box.comment.member" class="me-1" />

      <span class="ms-1 text-sm text-muted">添加于 {{ h.datetime(comment_box.comment.created_at) }}</span>

      <span class="ms-1 text-sm text-body-tertiary">[{{ comment_box.comment.id }}]</span>

      <template #actions>
        <Button preset="ghost" variant="secondary" size="sm" v-if="display == 'collapsed'" @click.prevent="changeDisplay()">展开</Button>

        <MoreDropdown>
          <DropdownMenuItem v-if="!readonly && allow('create', Comment)" @click.prevent="emit('modal', IssueCommentReplyDialogContent, issue_box, comment_box)">回复</DropdownMenuItem>

          <template v-if="!readonly && allow('update', comment_box.comment)">
            <DropdownMenuItem @click.prevent="emit('modal', IssueCommentEditDialogContent, issue_box, comment_box)">修改</DropdownMenuItem>
            <DropdownMenuItem v-if="children.length == 0" @click.prevent="emit('modal', IssueCommentConvertDialogContent, issue_box, comment_box)">关联</DropdownMenuItem>
            <!-- <DropdownMenuItem v-if="allow('destroy', comment)" @click.prevent="deleteComment">删除</DropdownMenuItem> -->

            <DropdownMenuSeparator />

            <template v-for="option in COMMENT_DISPLAY_OPTIONS">
              <DropdownMenuItem v-if="option.value != comment_box.comment.display" @click.prevent="updateComment({ display: option.value })">
                设为: {{ option.label }}
              </DropdownMenuItem>
            </template>
          </template>
        </MoreDropdown>
      </template>
    </CardHeader>

    <CardContent :id="content_id" :class="{ hidden: display == 'collapsed' }">
      <ContentBody :body="comment_box.comment" :editable="!readonly && allow('update', comment_box.comment)" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
      <Callout class="mt-3 py-1" v-if="children.length > 0">
        <template v-for="(child, index) in children">
          <div class="mt-4" v-if="index != 0"></div>
          <IssueCommentReply :readonly="readonly" :issue_box="issue_box" :comment_box="CommentBox.from(child)" @destroyed="emit('destroyed', $event)" @modal="(...args) => emit('modal', ...args)" />
        </template>
      </Callout>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/requests'
import { Attachment, Comment, CommentBox, CommentRepo, Issue, IssueBox } from "@/models"
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import { Callout } from '$ui/callout'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import Button from "$ui/button/Button.vue"
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const store = useSessionStore()
const user = store.account!.user
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  issue_box: IssueBox
  comment_box: CommentBox
  comment_repo: CommentRepo
  readonly: boolean
}>()

const emit = defineEmits<{
  destroyed: [ CommentBox ]
  updated: [ CommentBox ]

  modal: [ component: Component, ...args: any[] ]
}>()

const display = ref(props.comment_box.comment.display)
function changeDisplay() {
  display.value = display.value == 'collapsed' ? 'normal' : 'collapsed'
}

const children = computed(() => {
  return props.comment_repo.parent_id.findAll(props.comment_box.comment.id).sort((a, b) => a.created_at > b.created_at ? 1 : -1)
})

const content_id = _.uniqueId("content_")

const { mutateAsync: destroy_comment_action } = line.request(q.bug.issue_comments.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: update_comment_action } = line.request(q.bug.issue_comments.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deleteComment() {
  if (!confirm("确认删除该评论？")) {
    return
  }

  await destroy_comment_action({
    interpolations: {
      project_id: props.issue_box.issue.project_id,
      issue_id: props.issue_box.issue.id,
      comment_id: props.comment_box.comment.id
    }
  })

  emit("destroyed", props.comment_box)
}

async function updateComment(data: Record<string, any>) {
  const a_comment_box = await update_comment_action({
    interpolations: {
      project_id: props.issue_box.issue.project_id,
      issue_id: props.issue_box.issue.id,
      comment_id: props.comment_box.comment.id
    },
    body: data
  })

  display.value = a_comment_box.comment.display
  emit('updated', a_comment_box)
}

function onAttachmentUpdated(attachment: Attachment) {
  const index = props.comment_box.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment_box.comment.attachments[index] = attachment
  emit('updated', props.comment_box)
}

function onAttachmentDestroyed(attachment: Attachment) {
  const index = props.comment_box.comment.attachments.findIndex(it => it.id === attachment.id)
  props.comment_box.comment.attachments.splice(index, 1)
  emit('updated', props.comment_box)
}
</script>
