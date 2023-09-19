<template>
  <div class="page-header">
    <h2>新增问题模版</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields :project_id="project_id" v-bind="{ former }" />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>新增问题模版</layouts.submit>
          <router-link class="btn btn-secondary" :to="`/projects/${project_id}/issue_templates`">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
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
