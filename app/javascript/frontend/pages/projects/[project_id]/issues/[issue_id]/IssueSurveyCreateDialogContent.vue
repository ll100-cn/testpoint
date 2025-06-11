<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>选择问题模版</DialogTitle>
    </DialogHeader>
    <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="template_id" label="模版">
          <controls.Select>
            <OptionsForSelect :collection="issue_templates.map(it => ({ label: it.name, value: it.id }))" />
          </controls.Select>
        </FormGroup>
        <FormGroup path="remark" label="备注">
          <controls.String />
        </FormGroup>
      </div>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>新增模版化表单</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import OptionsForSelect from '@/components/OptionsForSelect.vue'
import * as q from '@/requests'
import { Issue, IssueTemplate, IssueBox } from "@/models"
import { getCurrentInstance, ref } from "vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [IssueBox]
}>()

const props = defineProps<{
  issue_box: IssueBox
}>()

const former = Former.build({
  template_id: undefined,
  remark: ""
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_issue_survey_action } = line.request(q.bug.issue_surveies.Create, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_issue_survey = await create_issue_survey_action({
    interpolations: {
      project_id: props.issue_box.issue.project_id,
      issue_id: props.issue_box.issue.id
    },
    body: former.form
  })

  props.issue_box.surveys.push(a_issue_survey)
  emit('updated', props.issue_box)

  open.value = false
}

const issue_templates = ref([] as IssueTemplate[])

const loading = ref(true)
async function reset() {
  loading.value = true

  try {
    const { data: issue_template_page, suspense } = line.request(q.project.issue_templates.List, (req, it) => {
      req.interpolations.project_id = props.issue_box.issue.project_id
      return it.useQuery(req.toQueryConfig())
    })
    await suspense()

    issue_templates.value = issue_template_page.value.list.map(it => it.issue_template)
  } finally {
    loading.value = false
  }
}

defineExpose({
  reset
})


</script>
