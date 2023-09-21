<template>
  <div class="d-flex align-items-start">
    <div class="card flex-grow-1 mb-3">
      <div :id="`issue${issue_info.id}_content`" class="card-body">
        <div class="card-title d-flex bg-white align-items-center">
          <img class="rounded-circle avatar me-1" :src=" issue_info.creator.avatarUrl()" width="20">
          <span>{{ issue_info.creator.name }}</span>
          <span class="ms-1 small text-muted">{{ utils.createOrEditTimeInWords(issue_info.created_at, issue_info.last_edited_at) }}</span>
          <div class="dropdown dropdown-no-arrow ms-auto">
            <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
              <i class="far fa-ellipsis-h" aria-hidden="true" />
            </button>
            <div class="dropdown-menu dropdown-menu-end" style="min-width: 3px;">
              <button class="small dropdown-item" @click="blank_modal.show(IssueContentEditFrame, issue_info)">修改</button>
            </div>
          </div>
        </div>

        <div class="no-margin-bottom">
          <PageContent :content="issue_info.content" />
          <AttachmentBox :attachments="issue_info.attachments" @deleted="onAttachmentDestroyed" @edited="onAttachmentChanged" />
        </div>
      </div>
    </div>
  </div>

  <teleport to="body">
    <BlankModal ref="blank_modal" @changed="onIssueChanged" />
  </teleport>
</template>

<script setup lang="ts">
import AttachmentBox from "@/components/AttachmentBox.vue"
import BlankModal from "@/components/BlankModal.vue"
import PageContent from "@/components/PageContent.vue"
import * as utils from "@/lib/utils"
import { Attachment, Issue, IssueInfo } from "@/models"
import { ref } from "vue"
import IssueContentEditFrame from "./IssueContentEditFrame.vue"

const blank_modal = ref(null as InstanceType<typeof BlankModal>)

const props = defineProps<{
  issue_info: IssueInfo
}>()

const emit = defineEmits<{
  changed: [IssueInfo]
}>()

function onIssueChanged(issue: Issue) {
  Object.assign(props.issue_info, issue)
  emit('changed', props.issue_info)
}

function onAttachmentChanged(attachment: Attachment) {
  const index = props.issue_info.attachments.findIndex(a => a.id == attachment.id)
  props.issue_info.attachments[index] = attachment
  emit('changed', props.issue_info)
}

function onAttachmentDestroyed(attachment: Attachment) {
  const index = props.issue_info.attachments.findIndex(a => a.id == attachment.id)
  props.issue_info.attachments.splice(index, 1)
  emit('changed', props.issue_info)
}
</script>
