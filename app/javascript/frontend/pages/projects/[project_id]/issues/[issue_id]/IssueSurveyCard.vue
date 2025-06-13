<template>
  <Card>
    <CardContent>
      <div> surverys counts is {{ issue_box.surveys.length }} </div>
      <template v-for="(issue_survey, index) in issue_box.surveys">
        <hr class="my-4" v-if="index > 0">

        <div>
          <div class="flex items-center mb-1">
            <span>备注：{{ issue_survey.remark }}</span>
            工单模版：{{ issue_survey.template.name }}
            <span class="ms-3 text-sm text-muted">修改于 {{ h.datetime(issue_survey.updated_at) }}</span>

            <MoreDropdown class="ms-auto">
              <DropdownMenuItem v-if="!readonly && allow('update', IssueSurvey)" @click.prevent="emit('modal', IssueSurveyEditDialogContent, issue_box, issue_survey)">修改</DropdownMenuItem>
              <DropdownMenuItem v-if="!readonly && allow('destroy', IssueSurvey)" @click.prevent="deleteIssueSurvey(issue_survey)">删除</DropdownMenuItem>
            </MoreDropdown>
          </div>

          <Alert variant="destructive" v-if="issue_survey.state == 'pending'">
            <p class="mb-2">该工单需要提供更多信息，请按照模版</p>
            <div>
              <Button size="sm" variant="destructive" v-if="!readonly && allow('update', IssueSurvey)" @click.prevent="emit('modal', IssueSurveyEditDialogContent, issue_box, issue_survey)">补充工单</Button>
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
import * as q from '@/requests'
import { Issue, IssueBox, IssueSurvey } from "@/models"
import { usePageStore } from "@/store"
import { type Component } from "vue"
import IssueSurveyEditDialogContent from "./IssueSurveyEditDialogContent.vue"
import { Card, CardContent } from '$ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import Button from "$ui/button/Button.vue"
import { Alert } from "$ui/alert"
import { useQueryLine } from '@/lib/useQueryLine'
import type { IssueFrameEmits } from "@/components/IssueFrame"

const line = useQueryLine()
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  readonly: boolean
  issue_box: IssueBox
}>()

const emit = defineEmits<IssueFrameEmits & {
  modal: [ component: Component, ...args: any[] ]
}>()

const { mutateAsync: destroy_issue_survey_action } = line.request(q.bug.issue_surveies.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function deleteIssueSurvey(issue_survey: IssueSurvey) {
  await destroy_issue_survey_action({
    interpolations: {
      project_id: props.issue_box.issue.project_id,
      issue_id: props.issue_box.issue.id,
      issue_survey_id: issue_survey.id
    }
  })

  const new_surveys = props.issue_box.surveys.filter(it => it.id !== issue_survey.id)
  emit("updated", { ...props.issue_box, surveys: new_surveys })
}

function onSurveyChanged(issue_survey: IssueSurvey) {
  const index = props.issue_box.surveys.findIndex(it => it.id == issue_survey.id)
  props.issue_box.surveys[index] = issue_survey
  emit("updated", props.issue_box)
}
</script>
