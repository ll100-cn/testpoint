<template>
  <div class="page-header">
    <h2>新增问题模版</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields :project_id="project_id" v-bind="{ former }" />

    <template #actions>
      <layouts.submit>新增问题模版</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issue_templates`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormHorizontal from '@/components/FormHorizontal.vue'
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
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

former.perform = async function() {
  await new requests.IssueTemplateReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/issue_templates')
}

</script>
