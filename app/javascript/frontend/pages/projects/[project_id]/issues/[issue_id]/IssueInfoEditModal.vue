<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #title>
      <h5 class="mb-0">填写模版</h5>
    </template>
    <template #body>
      <FormErrorAlert :validations="validations" />
      <layouts.vertical_group label="备注">
        <span>{{ issue_info.remark }}</span>
      </layouts.vertical_group>
      <layouts.vertical_group v-for="(input, index) in current_issue_template?.inputs" :key="index" v-slot="slotProps" :label="input.label">
        <forms.string v-bind="{ ...slotProps, code: 'value', form: form.inputs_attributes[index] }" />
      </layouts.vertical_group>
    </template>
    <template #footer>
      <SubmitButton :func="updateIssueInfo" submit_text="更新模版化表单" />
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { Validations, forms, layouts } from "@/components/simple_form"
import { Issue, IssueInfo, IssueTemplate } from "@/models"
import * as requests from '@/lib/requests'
import _ from "lodash"

import CommonModal from "@/components/CommonModal.vue"
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import SubmitButton from "@/components/SubmitButton.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
  issue_info: IssueInfo
}>()
const emits = defineEmits<{
  updateIssueInfo: [issue_info: IssueInfo]
}>()

const modal = ref<InstanceType<typeof CommonModal>>()
const form = ref({
  inputs_attributes: []
})
const _form = _.cloneDeep(form.value)
const validations = ref(new Validations())
const current_issue_template = ref<IssueTemplate>()

function resetForm() {
  form.value = _form
  form.value.inputs_attributes = build_inputs_attributes()
}

async function show() {
  modal.value.show()
  current_issue_template.value = await new requests.IssueTemplateReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_template_id = props.issue_info.template_id
  }).perform()
  form.value.inputs_attributes = build_inputs_attributes()
}

function build_inputs_attributes() {
  return _.map(current_issue_template.value?.inputs, (input, index) => {
    return { template_input_id: input.id, value: props.issue_info.values[input.id] }
  })
}

async function updateIssueInfo() {
  validations.value.clear()

  try {
    const issue_info = await new requests.IssueInfoReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
      req.interpolations.issue_info_id = props.issue_info.id
    }).perform(form.value)
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
