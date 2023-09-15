<template>
  <div class="page-header">
    <h2>修改标签</h2>
  </div>

  <FormHorizontal v-bind="{ former }" @submit.prevent="former.submit">
    <Fields />

    <template #actions>
      <layouts.submit>修改标签</layouts.submit>
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/test_case_labels`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { layouts } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import FormHorizontal from '@/components/FormHorizontal.vue'
import Former from '@/components/simple_form/Former'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id as string
const test_case_label_id = params.test_case_label_id
const test_case_label = ref(await new requests.TestCaseLabelReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.test_case_label_id = test_case_label_id
}).perform())

const former = Former.build({
  name: test_case_label.value.name,
  description: test_case_label.value.description,
})

former.perform = async function() {
  await new requests.TestCaseLabelReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.test_case_label_id = test_case_label_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/test_case_labels')
}
</script>
