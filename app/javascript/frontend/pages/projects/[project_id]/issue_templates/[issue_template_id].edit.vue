<template>
  <PageHeader>
    <PageTitle>修改问题模版</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :project_id="project_id" v-bind="{ former }" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-y-3">
          <Button>修改问题模版</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/issue_templates`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, FormFactory, PresenterConfigProvider, Separator } from '@/ui'
import { Button } from '@/ui'

const route = useRoute()
const router = useRouter()
const proxy = getCurrentInstance()!.proxy as any
const params = route.params as any

const project_id = params.project_id
const issue_template_id = params.issue_template_id

const issue_template = ref(await new q.project.IssueTemplateReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_template_id = issue_template_id
}).perform())

const former = Former.build({
  name: issue_template.value.name,
  content_suggestion: issue_template.value.content_suggestion,
  lookup_by_build_form: issue_template.value.lookup_by_build_form,
  title_suggestion: issue_template.value.title_suggestion,
  default_priority: issue_template.value.default_priority,
  default_category_id: issue_template.value.default_category_id,
  inputs_attributes: issue_template.value.inputs
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.project.IssueTemplateReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_template_id = issue_template_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/issue_templates')
}
</script>
