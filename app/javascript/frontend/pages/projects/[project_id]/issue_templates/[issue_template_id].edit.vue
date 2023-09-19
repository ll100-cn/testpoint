<template>
  <div class="page-header">
    <h2>修改问题模版</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields :project_id="project_id" v-bind="{ former }" />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>修改问题模版</layouts.submit>
          <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issue_templates`">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { Validations, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id
const issue_template_id = params.issue_template_id
const validations = ref(new Validations())

const issue_template = ref(await new requests.IssueTemplateReq.Get().setup(proxy, (req) => {
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

former.perform = async function() {
  await new requests.IssueTemplateReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.issue_template_id = issue_template_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/issue_templates')
}
</script>
