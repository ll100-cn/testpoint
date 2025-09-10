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
            <OptionsForSelect :collection="issue_template_boxes.map(it => ({ label: it.issue_template.name!, value: it.issue_template.id }))" />
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
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import type { IssueFrameEmits } from '@/components/IssueFrame'
import OptionsForSelect from '@/components/OptionsForSelect.vue'
import { useQueryLine } from '@/lib/useQueryLine'
import { type IssueBox } from "@/models"
import * as q from '@/requests'
import { computed } from "vue"

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<IssueFrameEmits>()

const props = defineProps<{
  issue_box: IssueBox
}>()

const former = Former.build({
  template_id: undefined,
  remark: ""
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_issue_survey_action } = line.request(q.bug.issue_surveies.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const project_id = computed(() => props.issue_box.issue.projectId)

const { data: issue_template_boxes, isLoading: loading } = line.request(q.project.issue_templates.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})

former.doPerform = async function() {
  const a_issue_survey_box = await create_issue_survey_action({
    interpolations: {
      project_id: props.issue_box.issue.projectId,
      issue_id: props.issue_box.issue.id
    },
    body: former.form
  })

  props.issue_box.surveys = [ ...props.issue_box.surveys, a_issue_survey_box.issue_survey ]
  emit('updated', props.issue_box)

  open.value = false
}

async function reset() {
}

defineExpose({
  reset
})


</script>
