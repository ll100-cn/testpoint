<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #content>
      <div class="modal-header">
        <h5 class="mb-0">填写模版</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
        <div class="modal-body">
          <FormErrorAlert />

          <div class="row gy-3">
            <layouts.group label="备注"><span>{{ issue_info.remark }}</span></layouts.group>
            <layouts.group v-for="(input, index) in current_issue_template?.inputs" :code="`inputs_attributes.${index}.value`" :key="index" :label="input.label">
              <controls.string />
            </layouts.group>
          </div>
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <SubmitButton :func="updateIssueInfo" submit_text="更新模版化表单" />
        </div>
      </layouts.form_vertical>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from "@/components/CommonModal.vue"
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import SubmitButton from "@/components/SubmitButton.vue"
import { Validations, controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as requests from '@/lib/requests'
import { Issue, IssueInfo, IssueTemplate } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
  issue_info: IssueInfo
}>()
const emits = defineEmits<{
  updateIssueInfo: [issue_info: IssueInfo]
}>()

const modal = ref<InstanceType<typeof CommonModal>>()
const former = Former.build({
  inputs_attributes: []
})

former.perform = async function() {
  const issue_info = await new requests.IssueInfoReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.issue_info_id = props.issue_info.id
  }).perform(this.form)

  emits("updateIssueInfo", issue_info)
  resetForm()
  modal.value.hide()
}

const _form = _.cloneDeep(former.form)
const validations = ref(new Validations())
const current_issue_template = ref<IssueTemplate>()

function resetForm() {
  former.form = _form
  former.form.inputs_attributes = build_inputs_attributes()
}

async function show() {
  modal.value.show()
  current_issue_template.value = await new requests.IssueTemplateReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_template_id = props.issue_info.template_id
  }).perform()
  former.form.inputs_attributes = build_inputs_attributes()
}

function build_inputs_attributes() {
  return _.map(current_issue_template.value?.inputs, (input, index) => {
    return { template_input_id: input.id, value: props.issue_info.values[input.id] ?? null }
  })
}

async function updateIssueInfo() {
  validations.value.clear()

  try {
    const issue_info = await new requests.IssueInfoReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
      req.interpolations.issue_info_id = props.issue_info.id
    }).perform(former.form)
    if (issue_info) {
      emits("updateIssueInfo", issue_info)
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
