<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #content>
      <div class="modal-header">
        <h5 class="mb-0">选择问题模版</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
        <div class="modal-body">
          <FormErrorAlert />
          <div class="row gy-3">
            <layouts.group code="template_id" label="模版">
              <controls.select v-bind="{ collection: issue_templates, valueMethod: 'id', labelMethod: 'name' }" />
            </layouts.group>
            <layouts.group code="remark" label="备注">
              <controls.string />
            </layouts.group>
          </div>
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>新增模版化表单</layouts.submit>
        </div>
      </layouts.form_horizontal>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from "@/components/CommonModal.vue"
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as requests from '@/lib/requests'
import { Issue, IssueInfo } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  addIssueInfo: [issue_info: IssueInfo]
}>()

const modal = ref<InstanceType<typeof CommonModal>>()

const former = Former.build({
  template_id: undefined,
  remark: ""
})

former.perform = async function() {
  const issue_info = await new requests.IssueInfoReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform(this.form)

  emits("addIssueInfo", issue_info)
  resetForm()
  modal.value.hide()
}

const issue_templates = ref([])
const _form = _.cloneDeep(former.form)

function resetForm() {
  former.form = _form
}

async function show() {
  modal.value.show()
  issue_templates.value = await new requests.IssueTemplateReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
  }).perform()
}

defineExpose({
  show
})
</script>
