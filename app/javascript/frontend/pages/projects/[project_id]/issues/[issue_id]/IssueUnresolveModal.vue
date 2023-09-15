<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #content>
      <div class="modal-header">
        <h5 class="mb-0">请在下方详细注明未解决的原因</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
        <div class="modal-body"><IssueCommentForm /></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>提交</layouts.submit>
        </div>
      </layouts.form_vertical>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from "@/components/CommonModal.vue"
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as requests from '@/lib/requests'
import { Issue, IssueInfo } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
}>()
const emit = defineEmits<{
  addIssueInfo: [issue_info: IssueInfo]
  updateIssue: [issue: Issue]
}>()

const modal = ref<InstanceType<typeof CommonModal>>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

former.perform = async function() {
  const issue = await new requests.IssueUnresolve().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform(this.form)

  emit("updateIssue", issue)
  resetForm()
  modal.value.hide()
}

const _form = _.cloneDeep(former.form)
function resetForm() {
  former.form = _form
}

async function show() {
  modal.value.show()
}

defineExpose({
  show
})
</script>
