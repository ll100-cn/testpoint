<template>
  <div class="d-flex align-items-start">
    <div class="card flex-grow-1 mb-3">
      <div class="card-body">
        <div class="card-title d-flex bg-white align-items-center">
          <MemberLabel :member="issue_info.creator" class="me-1" />
          <span class="ms-1 small text-muted">创建于 {{ utils.humanize(issue_info.created_at, DATE_LONG_FORMAT) }}</span>

          <MoreDropdown class="ms-auto">
            <a href="#" class="dropdown-item small" @click.prevent="blank_modal.show(IssueContentEditFrame, issue_info)">修改</a>
          </MoreDropdown>
        </div>

        <ContentBody :body="issue_info" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
      </div>
    </div>
  </div>

  <teleport to="body">
    <BlankModal ref="blank_modal" @changed="onIssueChanged" />
  </teleport>
</template>

<script setup lang="ts">
import BlankModal from "@/components/BlankModal.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import { DATE_LONG_FORMAT } from "@/constants"
import * as utils from "@/lib/utils"
import { Attachment, Issue, IssueInfo } from "@/models"
import { ref } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueContentEditFrame from "./IssueContentEditFrame.vue"
import MemberLabel from "@/components/MemberLabel.vue"

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

function onAttachmentUpdated(attachment: Attachment) {
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
