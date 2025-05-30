<template>
  <PageHeader>
    <PageTitle>修改问题模版</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :project_id="project_id" v-bind="{ former }" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>修改问题模版</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/issue_templates`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any

const project_id = params.project_id
const issue_template_id = params.issue_template_id

const issue_template_box = reqs.add(q.project.issue_templates.Get).setup(req => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_template_id = issue_template_id
}).wait()
await reqs.performAll()

const former = Former.build({
  name: issue_template_box.value.issue_template.name,
  content_suggestion: issue_template_box.value.issue_template.content_suggestion,
  lookup_by_build_form: issue_template_box.value.issue_template.lookup_by_build_form,
  title_suggestion: issue_template_box.value.issue_template.title_suggestion,
  default_priority: issue_template_box.value.issue_template.default_priority,
  default_category_id: issue_template_box.value.issue_template.default_category_id,
  inputs_attributes: issue_template_box.value.issue_template.inputs
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await reqs.add(q.project.issue_templates.Update).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_template_id = issue_template_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/issue_templates')
}
</script>
