<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>选择问题模版</DialogTitle>
    </DialogHeader>
    <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="template_id" label="模版">
          <controls.select>
            <OptionsForSelect :collection="issue_templates.map(it => ({ label: it.name, value: it.id }))" />
          </controls.select>
        </FormGroup>
        <FormGroup path="remark" label="备注">
          <controls.string />
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
import * as q from '@/lib/requests'
import { IssueInfo } from "@/models"
import { getCurrentInstance, ref } from "vue"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'

const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  template_id: undefined,
  remark: ""
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_issue_survey = await new q.bug.issue_surveies.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(this.form)

  props.issue_info.surveys.push(a_issue_survey)
  emit('updated', props.issue_info)

  open.value = false
}

const issue_templates = ref([])

const loading = ref(true)
async function reset() {
  loading.value = true

  try {
    issue_templates.value = await new q.project.issue_templates.List().setup(proxy, (req) => {
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
