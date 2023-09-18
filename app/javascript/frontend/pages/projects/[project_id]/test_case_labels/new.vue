<template>
  <div class="page-header">
    <h2>新增标签</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields />

    <template #actions>
      <layouts.submit>新增标签</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/test_case_labels`">取消</router-link>
    </template>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
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
  description: "",
})

former.perform = async function() {
  await new requests.TestCaseLabelReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/test_case_labels')
}
</script>
