<template>
  <div v-if="issue_survey.state == 'pending'" class="alert alert-danger d-flex">
    该工单需要提供更多信息，请按照模版
    <a role="button" class="alert-link ms-1" @click="issue_survey_edit_modal.show()">补充工单</a>
    <span v-if="issue_survey.remark">，备注：{{ issue_survey.remark }}</span>
    <div class="dropdown float-right dropdown-no-arrow ms-auto">
      <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
        <i class="far fa-ellipsis-h" aria-hidden="true" />
      </button>
      <div class="dropdown-menu dropdown-menu-end" style="min-width: 3px;">
        <a class="small dropdown-item" @click="destoryIssueSurvey">
          取消该模版
        </a>
      </div>
    </div>
  </div>
  <div v-else class="card mb-3">
    <div class="card-header d-flex align-items-center">
      工单模版：{{ issue_template.name }}
      <span class="ms-3 small text-muted">修改于 {{ utils.humanize(issue_survey.updated_at, DATE_LONG_FORMAT) }}</span>
      <div class="dropdown ms-auto dropdown-no-arrow">
        <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
          <i class="far fa-ellipsis-h" aria-hidden="true" />
        </button>
        <div class="dropdown-menu dropdown-menu-end" style="min-width: 3px;">
          <a class="small dropdown-item" @click="issue_survey_edit_modal.show()">
            修改
          </a>
          <a class="small dropdown-item" @click="destoryIssueSurvey">
            删除该模版
          </a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="no-margin-bottom">
        <template v-for="input in issue_template.inputs" :key="input">
          <p>{{ input.label }}: {{ issue_survey.values[input.id] }}</p>
        </template>
      </div>
    </div>
    <div v-if="issue_survey.remark" class="card-footer">
      备注：{{ issue_survey.remark }}
    </div>
  </div>
  <IssueSurveyEditModal ref="issue_survey_edit_modal" :issue="issue" :issue_survey="issue_survey" @update-issue-info="$emit('updateIssueSurvey', $event)" />
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { DATE_LONG_FORMAT } from '@/constants'
import * as utils from "@/lib/utils"
import { Issue, IssueSurvey } from "@/models"
import * as requests from '@/lib/requests'

import IssueSurveyEditModal from "./IssueSurveyEditModal.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue_survey: IssueSurvey
  issue: Issue
}>()

const emits = defineEmits<{
  destoryIssueSurvey: [issue_survey: IssueSurvey]
  updateIssueSurvey: [issue_survey: IssueSurvey]
}>()

const issue_survey_edit_modal = ref<InstanceType<typeof IssueSurveyEditModal>>()

const issue_template = ref(await new requests.IssueTemplateReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = props.issue.project_id
  req.interpolations.issue_template_id = props.issue_survey.template_id
}).perform())

async function destoryIssueSurvey() {
  const issue_survey = await new requests.IssueSurveyReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
    req.interpolations.issue_survey_id = props.issue_survey.id
  }).perform()
  if (issue_survey) {
    emits('destoryIssueSurvey', issue_survey)
  }
}
</script>
