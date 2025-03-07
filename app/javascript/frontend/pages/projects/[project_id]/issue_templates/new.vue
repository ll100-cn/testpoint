<template>
  <PageHeader>
    <PageTitle>新增问题模版</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :project_id="project_id" v-bind="{ former }" />

      <Separator class="my-4" preset="through" />

      <div class="space-x-3">
        <Button>新增问题模版</Button>
        <Button variant="secondary" :to="`/projects/${project_id}/issue_templates`">取消</Button>
      </div>
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
import { Former, FormFactory } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  name: "",
  content_suggestion: "",
  lookup_by_build_form: true,
  title_suggestion: "",
  default_priority: "normal",
  default_category_id: "",
  inputs_attributes: []
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await reqs.add(q.project.issue_templates.Create).setup(req => {
    req.interpolations.project_id = project_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/issue_templates')
}

</script>
