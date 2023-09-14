<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #content>
      <div class="modal-header">
        <h5 class="mb-0">请在下方详细注明未解决的原因</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <FormVertical :validations="validations">
        <div class="modal-body">
          <IssueCommentForm :form="form" :validations="validations" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <SubmitButton :func="unresolveIssue" />
        </div>
      </FormVertical>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { Validations } from "@/components/simple_form"
import { Issue, IssueInfo } from "@/models"
import * as requests from '@/lib/requests'
import _ from "lodash"
import CommonModal from "@/components/CommonModal.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import IssueCommentForm from './IssueCommentForm.vue'
import FormVertical from "@/components/FormVertical.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  addIssueInfo: [issue_info: IssueInfo]
  updateIssue: [issue: Issue]
}>()

const validations = ref(new Validations())
const modal = ref<InstanceType<typeof CommonModal>>()
const form = ref({
  content: "",
  attachment_ids: []
})
const _form = _.cloneDeep(form.value)
function resetForm() {
  form.value = _form
}

async function show() {
  modal.value.show()
}

async function unresolveIssue() {
  validations.value.clear()

  try {
    const issue = await new requests.IssueUnresolve().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
    }).perform(form.value)

    if (issue) {
      emits("updateIssue", issue)
      resetForm()
      modal.value.hide()
    }
  } catch (error) {
    if (validations.value.handleError(error)) {
      return
    }

    throw error
  }
}

defineExpose({
  show
})
</script>
