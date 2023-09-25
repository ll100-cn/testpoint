<template>
  <div ref="el" class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">选择问题模版</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">
          <FormErrorAlert />
          <div class="row gy-3">
            <layouts.group code="template_id" label="模版">
              <controls.select :collection="issue_templates" v-bind="{ valueMethod: 'id', labelMethod: 'name' }" />
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
    </div>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import BootstrapHelper from "@/lib/BootstrapHelper"
import * as q from '@/lib/requests'
import { IssueInfo } from "@/models"
import { getCurrentInstance, ref } from "vue"

const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

const emit = defineEmits<{
  changed: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  template_id: undefined,
  remark: ""
})

former.perform = async function() {
  const a_issue_survey = await new q.bug.IssueSurveyReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(this.form)

  props.issue_info.surveys.push(a_issue_survey)
  emit('changed', props.issue_info)

  BootstrapHelper.modal(el).hide()
}

const issue_templates = ref([])

const loading = ref(true)
async function reset() {
  loading.value = true

  try {
    issue_templates.value = await new q.project.IssueTemplateReq.List().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue_info.project_id
    }).perform()
  } finally {
    loading.value = false
  }
}

defineExpose({
  reset
})


</script>
