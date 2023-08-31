<template>
  <div class="page-header">
    <h2>新增问题模版</h2>
  </div>

  <form>
    <Form :form="form" :project_id="project_id" :validations="validations" />
  </form>

  <hr>

  <div class="x-actions offset-2">
    <SubmitButton submit_text="新增问题模版" :func="onSubmit" />
    <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issue_templates`">取消</router-link>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations } from "@/components/simple_form"
import * as requests from '@/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from './Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const project_id = route.params.project_id as string
const validations = ref(new Validations())

const form = ref({
  name: "",
  content_suggestion: "",
  lookup_by_build_form: true,
  title_suggestion: "",
  default_priority: "normal",
  default_category_id: "",
  inputs_attributes: []
})

async function onSubmit() {
  validations.value.clear()

  try {
    const issue_template = await new requests.IssueTemplateCreate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
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
