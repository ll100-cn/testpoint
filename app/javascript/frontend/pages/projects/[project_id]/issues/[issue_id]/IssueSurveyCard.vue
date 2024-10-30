<template>
  <Card>
    <CardContent>
      <template v-for="(issue_survey, index) in issue_info.surveys">
        <hr class="my-4" v-if="index > 0">

        <div>
          <div class="flex items-center mb-1">
            <span>备注：{{ issue_survey.remark }}</span>
            工单模版：{{ issue_survey.template.name }}
            <span class="ms-3 text-sm text-muted">修改于 {{ h.datetime(issue_survey.updated_at) }}</span>

            <MoreDropdown class="ms-auto">
              <DropdownMenuItem v-if="!readonly && allow('update', IssueSurvey)" @click.prevent="emit('modal', IssueSurveyEditDialogContent, issue_info, issue_survey)">修改</DropdownMenuItem>
              <DropdownMenuItem v-if="!readonly && allow('destroy', IssueSurvey)" @click.prevent="deleteIssueSurvey(issue_survey)">删除</DropdownMenuItem>
            </MoreDropdown>
          </div>

          <Alert variant="destructive" v-if="issue_survey.state == 'pending'">
            <p class="mb-2">该工单需要提供更多信息，请按照模版</p>
            <div>
              <Button size="sm" variant="destructive" v-if="!readonly && allow('update', IssueSurvey)" @click.prevent="emit('modal', IssueSurveyEditDialogContent, issue_info, issue_survey)">补充工单</Button>
            </div>
          </Alert>
          <div v-else>
            <div>
              <template v-for="input in issue_survey.template.inputs">
                <div><span class="text-muted">{{ input.label }}:</span> {{ issue_survey.values[input.id] }}</div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import MoreDropdown from "@/components/MoreDropdown.vue"
import * as h from '@/lib/humanize'
import * as q from '@/lib/requests'
import { IssueInfo, IssueSurvey } from "@/models"
import { usePageStore } from "@/store"
import { type Component, getCurrentInstance } from "vue"
import IssueSurveyEditDialogContent from "./IssueSurveyEditDialogContent.vue"
import { Alert, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '@/ui'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui'
import Button from "@/ui/button/Button.vue"

const proxy = getCurrentInstance()!.proxy as any
const page = usePageStore()
const allow = page.inProject().allow

const props = defineProps<{
  issue_info: IssueInfo
  readonly: boolean
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
