<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #title>
      <h5 class="mb-0">选择问题模版</h5>
    </template>
    <template #body>
      <FormErrorAlert :validations="validations" />
      <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('template_id')" label="模版">
        <forms.select v-bind="{ ...slotProps, form, collection: issue_templates, valueMethod: 'id', labelMethod: 'name' }" />
      </layouts.vertical_group>
      <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('remark')" label="备注">
        <forms.string v-bind="{ ...slotProps, form }" />
      </layouts.vertical_group>
    </template>
    <template #footer>
      <SubmitButton :func="addIssueInfo" submit_text="新增模版化表单" />
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { Validations, forms, layouts } from "@/components/simple_form"
import { Issue, IssueInfo } from "@/models"
import * as requests from "@/requests"
import _ from "lodash"

import CommonModal from "@/components/CommonModal.vue"
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import SubmitButton from "@/components/SubmitButton.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  addIssueInfo: [issue_info: IssueInfo]
}>()

const modal = ref<InstanceType<typeof CommonModal>>()
const form = ref({
  template_id: undefined,
  remark: ""
})
const validations = ref(new Validations())
const issue_templates = ref([])
const _form = _.cloneDeep(form.value)

function resetForm() {
  form.value = _form
}

async function show() {
  modal.value.show()
  issue_templates.value = await new requests.IssueTemplateList().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
  }).perform()
}

async function addIssueInfo() {
  validations.value.clear()

  try {
    const issue_info = await new requests.IssueInfoCreate().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
    }).perform(form.value)
    if (issue_info) {
      emits("addIssueInfo", issue_info)
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
