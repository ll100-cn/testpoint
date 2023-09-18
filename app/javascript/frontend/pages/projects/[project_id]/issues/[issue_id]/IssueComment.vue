<template>
  <div v-if="comment.comment_id === null" class="card flex-grow-1 issue-comment">
    <div :id="`comment${comment.id}_content`" class="card-body">
      <div v-if="editing" class="no-margin-bottom">
        <layouts.form_vertical v-bind="{ former: edit_former }" @submit.prevent="edit_former.submit">
          <IssueCommentForm :attachments="comment.attachments" @attachment-change="attachmentChange" />

          <template #actions>
            <button type="button" class="btn btn-secondary" @click.prevent="finishedEditing">取消</button>
            <layouts.submit class="ms-auto">提交修改</layouts.submit>
          </template>
        </layouts.form_vertical>
      </div>
      <template v-else>
        <div class="card-title d-flex align-items-center x-actions">
          <img class="rounded-circle avatar" :src="comment.member.avatarUrl()" width="20">
          <span>{{ comment.member.name }}</span>
          <span class="ms-1 small text-muted">{{ utils.createOrEditTimeInWords(comment.created_at, comment.last_edited_at) }}</span>
          <div class="dropdown dropdown-no-arrow ms-auto">
            <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
              <i class="far fa-ellipsis-h" aria-hidden="true" />
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="small dropdown-item" data-bs-toggle="collapse" :data-bs-target="`#replyComment-${comment.id}`" @click="startReplying">回复</a>
              <template v-if="comment.member.user_id == user.id">
                <a class="small dropdown-item" @click="startEditing">修改</a>
                <!-- <a class="small dropdown-item" @click="destroyComment">删除</a> -->
                <a v-if="comment.collapsed" class="small dropdown-item" @click="foldComment">显示</a>
                <a v-else class="small dropdown-item" @click="unfoldComment">隐藏</a>
              </template>
            </div>
          </div>
        </div>
        <div class="no-margin-bottom">
          <PageContent :content="comment.content" />
          <AttachmentBox :attachments="comment.attachments" @edited="emits('refreshComment')" @deleted="emits('refreshComment')" />
        </div>
      </template>
      <ul v-if="child_comment_mapping[comment.id]" class="list-group list-group-flush border-top">
        <IssueComment
          v-for="child_comment in child_comment_mapping[comment.id]" :key="child_comment.id"
          :issue="issue"
          :comment="child_comment"
          :child_comment_mapping="child_comment_mapping"
          @add-comment="emits('addComment', $event)"
          @refresh-comment="emits('refreshComment')"
          @update-comment="emits('updateComment', $event)"
          @destroy-comment="emits('destroyComment', $event)" />
      </ul>
    </div>

    <div :id="`replyComment-${comment.id}`" class="collapse mt-3">
      <div class="card-footer bg-white">
        <div class="d-flex">
          <span>回复 {{ comment.member.name }}:</span>
          <a class="btn btn-outline-secondary btn-sm ms-auto" data-bs-toggle="collapse" :data-bs-target="`#replyComment-${comment.id}`">
            <i class="fa fa-times me-1" />取消回复
          </a>
        </div>
        <layouts.form_vertical v-bind="{ former: reply_former }" @submit.prevent="reply_former.submit">
          <IssueCommentForm  @attachment-change="replyAttachmentChange" />

          <template #actions>
            <layouts.submit class="ms-auto">新增评论</layouts.submit>
          </template>
        </layouts.form_vertical>
      </div>
    </div>
  </div>
  <template v-else>
    <li class="list-group-item px-0">
      <layouts.form_vertical v-if="editing" v-bind="{ former: edit_former }" @submit.prevent="edit_former.submit">
        <IssueCommentForm :attachments="comment.attachments" @attachment-change="attachmentChange" />

        <template #actions>
          <button type="button" class="btn btn-secondary" @click.prevent="finishedEditing">取消</button>
          <layouts.submit class="ms-auto">提交修改</layouts.submit>
        </template>
      </layouts.form_vertical>
      <template v-else>
        <div class="d-flex mb-2 align-items-center x-actions">
          <img class="rounded-circle avatar" :src="comment.member.avatarUrl()" width="20">
          <span>{{ comment.member.name }}</span>
          <span class="text-muted small">回复评论：</span>
          <div class="dropdown dropdown-no-arrow ms-auto">
            <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
              <i class="far fa-ellipsis-h" aria-hidden="true" />
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <a v-if="comment.member.user_id == user.id" class="small dropdown-item" @click="startEditing">修改</a>
            <!-- <a class="small dropdown-item" @click="destroyComment">删除</a> -->
            </div>
          </div>
        </div>
        <PageContent :content="comment.content" />
        <AttachmentBox :attachments="comment.attachments" @edited="emits('refreshComment')" @deleted="emits('refreshComment')" />
        <span class="small text-muted">回复于 {{ utils.humanize(comment.created_at, DATE_SHORT_FORMAT) }}</span>
      </template>
    </li>
  </template>
</template>

<script setup lang="ts">
import AttachmentBox from "@/components/AttachmentBox.vue"
import PageContent from "@/components/PageContent.vue"
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { DATE_SHORT_FORMAT } from "@/constants"
import * as requests from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Attachment, Comment, Issue } from "@/models"
import { useSessionStore } from "@/store/session"
import { Collapse } from "bootstrap"
import _ from "lodash"
import { getCurrentInstance, nextTick, ref } from "vue"
import IssueCommentForm from "./IssueCommentForm.vue"

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const user = store.account.user

defineOptions({
  name: "IssueComment"
})
const props = defineProps<{
  issue: Issue
  comment: Comment
  child_comment_mapping: Record<string, Comment[]>
}>()
const emits = defineEmits<{
  refreshComment: []
  destroyComment: [comment: Comment]
  updateComment: [comment: Comment]
  addComment: [comment: Comment]
}>()
const editing = ref(false)
const replying = ref(false)

const edit_former = Former.build({
  content: props.comment.content,
  attachment_ids: []
})

edit_former.perform = async function() {
  const comment = await new requests.IssueCommentReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform(this.form)

  finishedEditing()
  emits("updateComment", comment)
}

function resetForm() {
  edit_former.form = {
    content: props.comment.content,
    attachment_ids: []
  }
}

function startEditing() {
  editing.value = true
  resetForm()
}

function finishedEditing() {
  editing.value = false
  resetForm()
}

async function destroyComment() {
  if (!confirm("确认删除该评论？")) {
    return
  }
  const comment = await new requests.IssueCommentReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  if (comment) {
    emits("destroyComment", comment)
  }
}

async function foldComment() {
  const comment = await new requests.IssueCommentReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform({
    collapsed: false
  })
  if (comment) {
    emits("updateComment", comment)
  }
}

async function unfoldComment() {
  const comment = await new requests.IssueCommentReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform({
    collapsed: true
  })

  if (comment) {
    emits("updateComment", comment)
  }
}

function attachmentChange($event: Attachment[]) {
  edit_former.form.attachment_ids = _.map($event, 'id')
  emits("refreshComment")
}

const reply_former = Former.build({
  content: "",
  attachment_ids: []
})

reply_former.perform = async function() {
  const comment = await new requests.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform({ ...this.form, comment_id: props.comment.id })

  emits("addComment", comment)
  finishedReplying()
}

function resetReplyForm() {
  reply_former.form = {
    content: "",
    attachment_ids: []
  }
}

function startReplying() {
  replying.value = true
  resetReplyForm()
}

function finishedReplying() {
  replying.value = false
  resetReplyForm()
  nextTick(() => {
    Collapse.getOrCreateInstance(document.getElementById(`replyComment-${props.comment.id}`)).hide()
  })
}

function replyAttachmentChange($event: Attachment[]) {
  reply_former.form.attachment_ids = _.map($event, 'id')
  emits("refreshComment")
}

</script>
