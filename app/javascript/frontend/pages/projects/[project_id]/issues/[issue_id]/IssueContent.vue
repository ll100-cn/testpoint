<template>
  <div class="flex items-start">
    <Card class="grow mb-3">
      <CardHeader>
        <MemberLabel :member="issue_info.creator" class="me-1" />
        <span class="ms-1 small text-muted">创建于 {{ h.datetime(issue_info.created_at) }}</span>

        <template #actions>
          <MoreDropdown v-if="!readonly">
            <DropdownMenuItem v-if="allow('update', 'IssueBody')" @click.prevent="blank_dialog.show(IssueContentEditDialogContent, issue_info)">修改</DropdownMenuItem>
            <DropdownMenuItem v-if="allow('update', 'IssueBody')" @click.prevent="converComment">转换为评论</DropdownMenuItem>
          </MoreDropdown>
        </template>
      </CardHeader>
      <CardContent>
        <ContentBody :body="issue_info" :editable="!readonly && allow('update', issue_info)" @attachment_destroyed="onAttachmentDestroyed" @attachment_updated="onAttachmentUpdated" />
      </CardContent>
    </Card>
  </div>

  <teleport to="body">
    <BlankDialog ref="blank_dialog" @updated="onIssueUpdated" />
  </teleport>
</template>

<script setup lang="ts">
import MemberLabel from "@/components/MemberLabel.vue"
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import { Attachment, Issue, IssueInfo } from "@/models"
import { ref } from "vue"
import ContentBody from "./ContentBody.vue"
import IssueContentEditDialogContent from "./IssueContentEditDialogContent.vue"
import { usePageStore } from "@/store"
import BlankDialog from "$vendor/ui/BlankDialog.vue"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, CardTable } from '$vendor/ui'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$vendor/ui'

const blank_dialog = ref(null!as InstanceType<typeof BlankDialog>)
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  issue_info: IssueInfo
  readonly: boolean
}>()

const emit = defineEmits<{
  updated: [IssueInfo],
  convert: [IssueInfo]
}>()

function onIssueUpdated(issue: Issue) {
  Object.assign(props.issue_info, issue)
  emit('updated', props.issue_info)
}

function onAttachmentUpdated(attachment: Attachment) {
  const index = props.issue_info.attachments.findIndex(a => a.id == attachment.id)
  props.issue_info.attachments[index] = attachment
  emit('updated', props.issue_info)
}

function onAttachmentDestroyed(attachment: Attachment) {
  const index = props.issue_info.attachments.findIndex(a => a.id == attachment.id)
  props.issue_info.attachments.splice(index, 1)
  emit('updated', props.issue_info)
}

function converComment() {
  emit('convert', props.issue_info)
}
</script>
