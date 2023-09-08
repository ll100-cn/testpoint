<template>
  <div class="issue-content">
    <div class="d-flex align-items-start">
      <div class="card flex-grow-1 mb-3">
        <div :id="`issue${issue.id}_content`" class="card-body">
          <div class="card-title d-flex bg-white align-items-center">
            <img class="rounded-circle avatar me-1" :src="user.avatar_url" width="20">
            <span>{{ issue.creator.name }}</span>
            <span class="ms-1 small text-muted">{{ issue.createOrEditTimeInWords() }}</span>
            <div class="dropdown dropdown-no-arrow ms-auto">
              <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
                <i class="far fa-ellipsis-h" aria-hidden="true" />
              </button>
              <div class="dropdown-menu dropdown-menu-end" style="min-width: 3px;">
                <button class="small dropdown-item" @click="startEditing">修改</button>
              </div>
            </div>
          </div>

          <div class="card-text no-margin-bottom">
            <template v-if="editing">
              <form>
                <IssueCommentForm
                  :form="form"
                  :attachments="issue_attachments"
                  :validations="validations"
                  @attachment-change="attachmentChange" />
                <div class="d-flex mt-3">
                  <button class="btn btn-secondary" @click.prevent="finishedEditing">取消</button>
                  <SubmitButton class="ms-auto" :func="issueEdit" submit_text="提交修改" />
                </div>
              </form>
            </template>
            <div v-else>
              <PageContent :content="issue.content" />
              <AttachmentBox :attachments="issue_attachments" @deleted="emits('refreshIssue')" @edited="emits('refreshIssue')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { Attachment, Issue, User } from "@/models"
import * as requests from "@/requests"
import _ from "lodash"

import PageContent from "@/components/PageContent.vue"
import AttachmentBox from "@/components/AttachmentBox.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import IssueCommentForm from "./IssueCommentForm.vue"
import { Validations } from "@/components/simple_form"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
  user: User
  issue_attachments: Attachment[]
}>()

const emits = defineEmits<{
  updateIssue: [issue: Issue]
  refreshIssue: []
}>()
const editing = ref(false)

const validations = ref(new Validations())
const form = ref({
  content: props.issue.content,
  attachment_ids: []
})

function resetForm() {
  form.value = {
    content: props.issue.content,
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

function attachmentChange($event: Attachment[]) {
  form.value.attachment_ids = _.map($event, 'id')
  emits("refreshIssue")
}

async function issueEdit() {
  validations.value.clear()

  try {
    const issue = await new requests.IssueUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
    }).perform(form.value)
    if (issue) {
      finishedEditing()
      emits("updateIssue", issue)
    }
  } catch (error) {
    if (validations.value.handleError(error)) {
      return
    }

    throw error
  }
}

</script>
