<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>填写模版</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup label="备注"><span>{{ issue_survey.remark }}</span></FormGroup>
        <FormGroup v-for="(input, index) in current_issue_template?.inputs" :path="`inputs_attributes.${index}.value`" :key="index" :label="input.label">
          <controls.String />
        </FormGroup>
      </div>
      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>更新模版化表单</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { Issue, IssueSurvey, IssueTemplate, IssueBox, IssueTemplateBox } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'

const reqs = useRequestList()
const open = defineModel('open')

const emits = defineEmits<{
  updated: [Issue]
}>()

const former = Former.build({
  inputs_attributes: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_issue_survey = await reqs.add(q.bug.issue_surveies.Update).setup(req => {
    req.interpolations.project_id = issue_box.value.issue.project_id
    req.interpolations.issue_id = issue_box.value.issue.id
    req.interpolations.issue_survey_id = issue_survey.value.id
  }).perform(this.form)

  const index = issue_box.value.surveys.findIndex(it => it.id == a_issue_survey.id)
  issue_box.value.surveys[index] = a_issue_survey

  emits("updated", issue_box.value.issue)
  open.value = false
}

const current_issue_template_box = ref<IssueTemplateBox>()

function build_inputs_attributes() {
  return _.map(current_issue_template_box.value?.issue_template.inputs, (input, index) => {
    return { template_input_id: input.id, value: issue_survey.value.values[input.id] ?? null }
  })
}

const issue_box = ref(null! as IssueBox)
const issue_survey = ref(null! as IssueSurvey)
const loading = ref(true)

async function reset(a_issue_box: IssueBox, a_issue_survey: IssueSurvey) {
  loading.value = true
  issue_box.value = a_issue_box
  issue_survey.value = a_issue_survey

  try {
    current_issue_template_box.value = await reqs.add(q.project.issue_templates.Get).setup(req => {
      req.interpolations.project_id = issue_box.value.issue.project_id
      req.interpolations.issue_template_id = issue_survey.value.template_id
    }).perform()

    former.form.inputs_attributes = build_inputs_attributes()
  } finally {
    loading.value = false
  }
}

defineExpose({ reset })
</script>
