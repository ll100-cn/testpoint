<template>
  <div class="card page-card">
    <div class="card-body">
      <template v-for="(issue_survey, index) in issue_info.surveys">
        <hr v-if="index > 0">

        <div>
          <div class="d-flex align-items-center mb-1">
            <span>备注：{{ issue_survey.remark }}</span>
            工单模版：{{ issue_survey.template.name }}
            <span class="ms-3 small text-muted">修改于 {{ utils.humanize(issue_survey.updated_at, DATE_LONG_FORMAT) }}</span>

            <div class="dropdown ms-auto dropdown-no-arrow">
              <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" style="background: transparent;">
                <i class="far fa-ellipsis-h" aria-hidden="true" />
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="small dropdown-item" @click="blank_modal.show(IssueSurveyEditFrame, issue_info, issue_survey)">修改</a>
                <a class="small dropdown-item" @click="deleteIssueSurvey(issue_survey)">删除</a>
              </div>
            </div>
          </div>

          <div v-if="issue_survey.state == 'pending'" class="alert alert-danger mb-0">
            <p class="mb-2">该工单需要提供更多信息，请按照模版</p>
            <div>
              <a class="btn btn-danger btn-sm" @click="blank_modal.show(IssueSurveyEditFrame, issue_info, issue_survey)">补充工单</a>
            </div>
          </div>
          <div v-else>
            <div>
              <template v-for="input in issue_survey.template.inputs">
                <div><span class="text-muted">{{ input.label }}:</span> {{ issue_survey.values[input.id] }}</div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <teleport to="body">
    <BlankModal ref="blank_modal" @changed="onSurveyChanged" />
  </teleport>
</template>

<script setup lang="ts">
import BlankModal from "@/components/BlankModal.vue"
import { DATE_LONG_FORMAT } from '@/constants'
import * as requests from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Issue, IssueInfo, IssueSurvey } from "@/models"
import { getCurrentInstance, ref } from "vue"
import IssueSurveyEditFrame from "./IssueSurveyEditFrame.vue"

const blank_modal = ref(null as InstanceType<typeof BlankModal>)
const { proxy } = getCurrentInstance()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const emits = defineEmits<{
  changed: [ IssueInfo ]
}>()

async function deleteIssueSurvey(issue_survey: IssueSurvey) {
  await new requests.IssueSurveyReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
    req.interpolations.issue_survey_id = issue_survey.id
  }).perform()

  const index = props.issue_info.surveys.findIndex(it => it.id == issue_survey.id)
  props.issue_info.surveys.splice(index , 1)
  emits("changed", props.issue_info)
}

function onSurveyChanged(issue_survey: IssueSurvey) {
  const index = props.issue_info.surveys.findIndex(it => it.id == issue_survey.id)
  props.issue_info.surveys[index] = issue_survey
  emits("changed", props.issue_info)
}
</script>
