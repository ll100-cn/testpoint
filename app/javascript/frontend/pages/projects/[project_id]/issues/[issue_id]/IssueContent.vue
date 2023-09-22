<template>
  <div class="d-flex align-items-start">
    <div class="card flex-grow-1 mb-3">
      <div :id="`issue${issue_info.id}_content`" class="card-body">
        <div class="card-title d-flex bg-white align-items-center">
          <img class="rounded-circle avatar me-1" :src="issue_info.creator.avatar_url" width="20">
          <span>{{ issue_info.creator.name }}</span>
          <span class="ms-1 small text-muted">创建于 {{ utils.humanize(issue_info.created_at, DATE_LONG_FORMAT) }}</span>

          <MoreDropdown class="ms-auto">
            <a href="#" class="dropdown-item small" @click.prevent="blank_modal.show(IssueContentEditFrame, issue_info)">修改</a>
          </MoreDropdown>
        </div>

        <div class="no-margin-bottom">
          <PageContent :content="issue_info.content" />
          <span v-if="issue_info.created_at != issue_info.last_edited_at" class="text-muted small">
            最后修改于: {{ utils.humanize(issue_info.last_edited_at, DATE_LONG_FORMAT) }}
          </span>
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
import MoreDropdown from "@/components/MoreDropdown.vue"
import PageContent from "@/components/PageContent.vue"
import { DATE_LONG_FORMAT } from "@/constants"
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
