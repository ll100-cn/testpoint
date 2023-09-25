<template>
  <div ref="el" class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">填写模版</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">
          <FormErrorAlert />

          <div class="row gy-3">
            <layouts.group label="备注"><span>{{ issue_survey.remark }}</span></layouts.group>
            <layouts.group v-for="(input, index) in current_issue_template?.inputs" :code="`inputs_attributes.${index}.value`" :key="index" :label="input.label">
              <controls.string />
            </layouts.group>
          </div>
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>更新模版化表单</layouts.submit>
        </div>
      </layouts.form_vertical>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import BootstrapHelper from "@/lib/BootstrapHelper"
import * as q from '@/lib/requests'
import { Issue, IssueSurvey, IssueTemplate } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"

const { proxy } = getCurrentInstance()
const el = ref(null! as HTMLElement)

const emits = defineEmits<{
  updated: [ IssueSurvey ]
}>()

const former = Former.build({
  inputs_attributes: []
})

former.perform = async function() {
  const a_issue_survey = await new q.bug.IssueSurveyReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
    req.interpolations.issue_survey_id = issue_survey.value.id
  }).perform(this.form)

  emits("updated", a_issue_survey)
  BootstrapHelper.modal(el).hide()
}

const current_issue_template = ref<IssueTemplate>()

function build_inputs_attributes() {
  return _.map(current_issue_template.value?.inputs, (input, index) => {
    return { template_input_id: input.id, value: issue_survey.value.values[input.id] ?? null }
  })
}

const issue = ref(null as Issue)
const issue_survey = ref(null as IssueSurvey)
const loading = ref(true)

async function reset(a_issue: Issue, a_issue_survey: IssueSurvey) {
  loading.value = true
  issue.value = a_issue
  issue_survey.value = a_issue_survey

  try {
    current_issue_template.value = await new q.project.IssueTemplateReq.Get().setup(proxy, (req) => {
      req.interpolations.project_id = issue.value.project_id
      req.interpolations.issue_template_id = issue_survey.value.template_id
    }).perform()
    former.form.inputs_attributes = build_inputs_attributes()
  } finally {
    loading.value = false
  }
}

defineExpose({ reset })
</script>
