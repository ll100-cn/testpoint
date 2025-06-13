<template>
  <div class="flex items-start">
    <Card class="grow mb-3">
      <CardHeader>
        <MemberLabel :member="issue_box.issue.creator" class="me-1" />
        <span class="ms-1 small text-muted">创建于 {{ h.datetime(issue_box.issue.created_at) }}</span>

        <template #actions>
          <MoreDropdown v-if="!readonly">
            <DropdownMenuItem v-if="allow('update', 'IssueBody')" @click.prevent="blank_dialog.show(IssueContentEditDialogContent, issue_box)">修改</DropdownMenuItem>
            <DropdownMenuItem v-if="allow('update', 'IssueBody')" @click.prevent="converComment">转换为评论</DropdownMenuItem>
          </MoreDropdown>
        </template>
      </CardHeader>
      <CardContent>
        <ContentBody :body="body" :editable="!readonly && allow('update', issue_box.issue)" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
      </CardContent>
    </Card>
  </div>

  <teleport to="body">
    <BlankDialog ref="blank_dialog" @updated="onIssueUpdated" />
  </teleport>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader } from '$ui/card'
import { DropdownMenuItem } from '$ui/dropdown-menu'
import BlankDialog from "@/components/BlankDialog.vue"
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import { Attachment, IssueBox } from "@/models"
import { usePageStore } from "@/store"
import { computed, ref } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueContentEditDialogContent from "./IssueContentEditDialogContent.vue"
import type { IssueFrameComponent } from '@/components/IssueFrame'

const IssueDialog = BlankDialog as typeof BlankDialog & IssueFrameComponent
const blank_dialog = ref(null! as InstanceType<typeof BlankDialog & IssueFrameComponent>)
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  readonly: boolean
  issue_box: IssueBox
}>()

const emit = defineEmits<{
  updated: [IssueBox],
  convert: [IssueBox]
}>()

const body = computed(() => {
  return {
    content: props.issue_box.issue.content,
    attachments: props.issue_box.attachments,
    created_at: props.issue_box.issue.created_at,
    last_edited_at: props.issue_box.issue.last_edited_at
  }
})


function onIssueUpdated(issue_box: IssueBox) {
  Object.assign(props.issue_box, issue_box)
  emit('updated', props.issue_box)
}

function onAttachmentUpdated(attachment: Attachment) {
  const index = props.issue_box.attachments.findIndex((a: Attachment) => a.id == attachment.id)
  props.issue_box.attachments[index] = attachment
  emit('updated', props.issue_box)
}

function onAttachmentDestroyed(attachment: Attachment) {
  const index = props.issue_box.attachments.findIndex((a: Attachment) => a.id == attachment.id)
  props.issue_box.attachments.splice(index, 1)
  emit('updated', props.issue_box)
}

function converComment() {
  emit('convert', props.issue_box)
}
</script>
