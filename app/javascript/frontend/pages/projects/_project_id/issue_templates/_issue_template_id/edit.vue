<template>
  <div class="page-header">
    <h2>修改问题模版</h2>
  </div>

  <Form :categories="categories" :form="form" :project_id="project_id" :validations="validations" />

  <hr>

  <div class="x-actions offset-2">
    <SubmitButton submit_text="修改问题模版" :func="onSubmit" />
    <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issue_templates`">取消</router-link>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations } from "@/components/simple_form"
import * as requests from '@/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from '../Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const project_id = route.params.project_id as string
const issue_template_id = route.params.issue_template_id as string
const validations = ref(new Validations())

const categories = ref(await new requests.CategoryList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const issue_template = ref(await new requests.IssueTemplateShow().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.issue_template_id = issue_template_id
}).perform())

const form = ref({
  name: issue_template.value.name,
  content_suggestion: issue_template.value.content_suggestion,
  lookup_by_build_form: issue_template.value.lookup_by_build_form,
  title_suggestion: issue_template.value.title_suggestion,
  default_priority: issue_template.value.default_priority,
  default_category_id: issue_template.value.default_category_id,
  inputs_attributes: issue_template.value.inputs
})

async function onSubmit() {
  validations.value.clear()

  try {
    const issue_template = await new requests.IssueTemplateUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.issue_template_id = issue_template_id
    }).perform(form.value)
    if (issue_template) {
      router.push('/projects/' + project_id + '/issue_templates')
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

</script>
