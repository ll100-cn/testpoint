<template>
  <div class="card page-card">
    <div class="card-body">
      <template v-for="(issue_survey, index) in issue_info.surveys">
        <hr v-if="index > 0">

        <div>
          <div class="d-flex align-items-center mb-1">
            <span>备注：{{ issue_survey.remark }}</span>
            工单模版：{{ issue_survey.template.name }}
            <span class="ms-3 small text-muted">修改于 {{ h.datetime(issue_survey.updated_at) }}</span>

            <MoreDropdown class="ms-auto">
              <a v-if="allow('update', IssueSurvey)" class="small dropdown-item" href="#" @click.prevent="emit('modal', IssueSurveyEditFrame, issue_info, issue_survey)">修改</a>
              <a v-if="allow('destroy', IssueSurvey)" class="small dropdown-item" href="#" @click.prevent="deleteIssueSurvey(issue_survey)">删除</a>
            </MoreDropdown>
          </div>

          <div v-if="issue_survey.state == 'pending'" class="alert alert-danger mb-0">
            <p class="mb-2">该工单需要提供更多信息，请按照模版</p>
            <div>
              <a v-if="allow('update', IssueSurvey)" class="btn btn-danger btn-sm" href="#" @click.prevent="emit('modal', IssueSurveyEditFrame, issue_info, issue_survey)">补充工单</a>
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
</template>

<script setup lang="ts">
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { IssueInfo, IssueSurvey } from "@/models"
import { usePageStore } from "@/store"
import { Component, getCurrentInstance } from "vue"
import IssueSurveyEditFrame from "./IssueSurveyEditFrame.vue"

const { proxy } = getCurrentInstance()
const page = usePageStore()
const allow = page.inProject().allow

const props = defineProps<{
  issue_info: IssueInfo
}>()

const emit = defineEmits<{
  updated: [ IssueInfo ]
  modal: [ component: Component, ...args: any[] ]
}>()

async function deleteIssueSurvey(issue_survey: IssueSurvey) {
  await new q.bug.IssueSurveyReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
    req.interpolations.issue_survey_id = issue_survey.id
  }).perform()

  const index = props.issue_info.surveys.findIndex(it => it.id == issue_survey.id)
  props.issue_info.surveys.splice(index , 1)
  emit("updated", props.issue_info)
}

function onSurveyChanged(issue_survey: IssueSurvey) {
  const index = props.issue_info.surveys.findIndex(it => it.id == issue_survey.id)
  props.issue_info.surveys[index] = issue_survey
  emit("updated", props.issue_info)
}
</script>
