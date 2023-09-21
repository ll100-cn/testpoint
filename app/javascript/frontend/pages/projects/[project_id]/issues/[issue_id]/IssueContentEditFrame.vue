<template>
  <div ref="el" class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
        <div class="modal-body">
          <IssueCommentForm :attachments="issue_info?.attachments ?? []" @attachment-change="attachmentChange" />
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>提交修改</layouts.submit>
        </div>
      </layouts.form_vertical>
    </div>
  </div>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import BootstrapHelper from '@/lib/BootstrapHelper'
import * as requests from '@/lib/requests'
import { Attachment, Issue, IssueInfo } from '@/models'
import { getCurrentInstance, ref } from 'vue'
import IssueCommentForm from './IssueCommentForm.vue'

const { proxy } = getCurrentInstance()
const el = ref(null! as HTMLElement)

const emit = defineEmits<{
  changed: [Issue]
}>()

const issue_info = ref(null as IssueInfo | null)

const former = Former.build({
  content: '',
  attachment_ids: []
})

former.perform = async function() {
  const a_issue = await new requests.IssueReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = issue_info.value.project_id
    req.interpolations.issue_id = issue_info.value.id
  }).perform(this.form)

  emit("changed", a_issue)
  BootstrapHelper.modal(el).hide()
}

function attachmentChange(attachments: Attachment[]) {
  former.form.attachment_ids = attachments.map(it => it.id)
}

function reset(a_issue_info: IssueInfo) {
  issue_info.value = a_issue_info

  former.form.content = a_issue_info.content
  former.form.attachment_ids = a_issue_info.attachments.map(it => it.id)
}

defineExpose({ reset })

</script>