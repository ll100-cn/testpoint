<template>
  <div class="card flex-grow-1 issue-comment">
    <div :id="`comment${comment.id}_content`" class="card-body">
      <div v-if="editing" class="card-text no-margin-bottom">
        <form>
          <IssueCommentForm
            :form="form"
            :attachments="comment.attachments"
            :validations="validations"
            @attachment-change="attachmentChange" />
          <div class="d-flex mt-3">
            <button class="btn btn-secondary" @click.prevent="finishedEditing">取消</button>
            <SubmitButton class="ms-auto" :func="editComment" submit_text="提交修改" />
          </div>
        </form>
      </div>
      <template v-else>
        <div class="card-title d-flex align-items-center">
          <!-- <img class="rounded-circle avatar me-1" :src="user.avatar_url" width="20"> -->
          <span>{{ comment.member.name }}</span>
          <span class="ms-1 small text-muted">{{ comment.createOrEditTimeInWords() }}</span>
          <div class="dropdown dropdown-no-arrow ms-auto">
            <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
              <i class="far fa-ellipsis-h" aria-hidden="true" />
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="small dropdown-item" data-bs-toggle="collapse" :data-bs-target="`#newCommentComment-${comment.id}`" @click="startReplying">回复</a>
              <a v-if="comment.member.user_id == user.id" class="small dropdown-item" @click="startEditing">修改</a>
              <a class="small dropdown-item" @click="destroyComment">删除</a>
              <a v-if="comment.collapsed" class="small dropdown-item" @click="foldComment">显示</a>
              <a v-else class="small dropdown-item" @click="unfoldComment">隐藏</a>
            </div>
          </div>
        </div>
        <div class="card-text no-margin-bottom">
          <PageContent :content="comment.content" />
          <AttachmentBox :attachments="comment.attachments" @edited="emits('refreshComment')" @deleted="emits('refreshComment')" />
        </div>
      </template>
      <div v-if="child_comment_mapping[comment.id]" class="card-text border-top">
        <ul class="list-group list-group-flush">
          <li v-for="child_comment in child_comment_mapping[comment.id]" :key="child_comment.id" class="list-group-item px-0">
            <!-- TODO: avatar -->
            {{ child_comment.member.name }}
            <span class="text-muted ms-1">回复评论：</span>
            <PageContent :content="child_comment.content" />
            <AttachmentBox :attachments="child_comment.attachments" @edited="emits('refreshComment')" @deleted="emits('refreshComment')" />
            <span class="small text-muted">回复于 {{ utils.humanize(child_comment.created_at, DATE_SHORT_FORMAT) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div :id="`newCommentComment-${comment.id}`" class="collapse mt-3">
      <div class="card-footer bg-white">
        <div class="d-flex">
          <span>回复 {{ comment.member.name }}:</span>
          <a class="btn btn-outline-secondary btn-sm ms-auto" data-bs-toggle="collapse" :data-bs-target="`#newCommentComment-${comment.id}`">
            <i class="fa fa-times me-1" />取消回复
          </a>
        </div>
        <form>
          <IssueCommentForm
            :form="reply_form"
            :validations="reply_validations"
            @attachment-change="replyAttachmentChange" />
          <div class="d-flex mt-3">
            <SubmitButton class="ms-auto" :func="replyComment" submit_text="新增评论" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, nextTick } from "vue"

import { Attachment, Comment, Issue } from "@/models"
import * as requests from "@/requests"
import { useSessionStore } from "@/store"
import { Validations } from "@/components/simple_form"
import * as utils from "@/lib/utils"
import _ from "lodash"
import { Collapse } from "bootstrap"

import PageContent from "@/components/PageContent.vue"
import AttachmentBox from "@/components/AttachmentBox.vue"
import IssueCommentForm from "./IssueCommentForm.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import { DATE_SHORT_FORMAT } from "@/constants"

const { proxy } = getCurrentInstance()
const store = useSessionStore()
const user = store.account

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

const validations = ref(new Validations())
const form = ref({
  content: props.comment.content,
  attachment_ids: []
})

function resetForm() {
  form.value = {
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
  const comment = await new requests.IssueCommentCreateDestroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  if (comment) {
    emits("destroyComment", comment)
  }
}

async function foldComment() {
  const comment = await new requests.IssueCommentFold().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()
  if (comment) {
    emits("updateComment", comment)
  }
}

async function unfoldComment() {
  const comment = await new requests.IssueCommentUnfold().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.comment_id = props.comment.id
  }).perform()

  if (comment) {
    emits("updateComment", comment)
  }
}

async function editComment() {
  validations.value.clear()

  try {
    const comment = await new requests.IssueCommentUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
      req.interpolations.comment_id = props.comment.id
    }).perform(form.value)

    if (comment) {
      finishedEditing()
      emits("updateComment", comment)
    }
  } catch (error) {
    if (validations.value.handleError(error)) {
      return
    }

    throw error
  }
}

function attachmentChange($event: Attachment[]) {
  form.value.attachment_ids = _.map($event, 'id')
  emits("refreshComment")
}

const reply_form = ref({
  content: "",
  attachment_ids: []
})
const reply_validations = ref(new Validations())
function resetReplyForm() {
  reply_form.value = {
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
    Collapse.getOrCreateInstance(document.getElementById(`newCommentComment-${props.comment.id}`)).hide()
  })
}

async function replyComment() {
  reply_validations.value.clear()

  try {
    const comment = await new requests.IssueCommentCreate().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
    }).perform({ ...reply_form.value, comment_id: props.comment.id })
    if (comment) {
      emits("addComment", comment)
      finishedReplying()
    }
  } catch (error) {
    if (reply_validations.value.handleError(error)) {
      return
    }

    throw error
  }
}

function replyAttachmentChange($event: Attachment[]) {
  reply_form.value.attachment_ids = _.map($event, 'id')
  emits("refreshComment")
}

</script>
