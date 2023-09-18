<template>
  <div class="issue-content">
    <div class="d-flex align-items-start">
      <div class="card flex-grow-1 mb-3">
        <div :id="`issue${issue.id}_content`" class="card-body">
          <div class="card-title d-flex bg-white align-items-center">
            <img class="rounded-circle avatar me-1" :src=" issue.creator.avatarUrl()" width="20">
            <span>{{ issue.creator.name }}</span>
            <span class="ms-1 small text-muted">{{ utils.createOrEditTimeInWords(issue.created_at, issue.last_edited_at) }}</span>
            <div class="dropdown dropdown-no-arrow ms-auto">
              <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
                <i class="far fa-ellipsis-h" aria-hidden="true" />
              </button>
              <div class="dropdown-menu dropdown-menu-end" style="min-width: 3px;">
                <button class="small dropdown-item" @click="startEditing">修改</button>
              </div>
            </div>
          </div>

          <div class="no-margin-bottom">
            <template v-if="editing">
              <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
                <IssueCommentForm :attachments="issue_attachments" @attachment-change="attachmentChange" />

                <hr class="x-form-divider-through">

                <layouts.group control_wrap_class="x-actions x-spacer-2">
                  <button class="btn btn-secondary" type="button" @click.prevent="finishedEditing">取消</button>
                  <layouts.submit class="ms-auto">提交修改</layouts.submit>
                </layouts.group>
              </layouts.form_vertical>
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
import AttachmentBox from "@/components/AttachmentBox.vue"
import PageContent from "@/components/PageContent.vue"
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as requests from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Attachment, Issue, User } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"
import IssueCommentForm from "./IssueCommentForm.vue"

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

const former = Former.build({
  content: props.issue.content,
  attachment_ids: []
})

former.perform = async function() {
  const issue = await new requests.IssueReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform(this.form)

  finishedEditing()
  emits("updateIssue", issue)
}

function resetForm() {
  former.form = {
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
  former.form.attachment_ids = _.map($event, 'id')
  emits("refreshIssue")
}
</script>
