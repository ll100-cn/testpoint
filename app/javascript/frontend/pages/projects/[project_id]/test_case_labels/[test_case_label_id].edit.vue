<template>
  <div class="page-header">
    <h2>修改标签</h2>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>修改标签</layouts.submit>
          <router-link class="btn btn-secondary" :to="`/projects/${project_id}/test_case_labels`">取消</router-link>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id as string
const test_case_label_id = params.test_case_label_id
const test_case_label = ref(await new q.project.TestCaseLabelInfoReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.test_case_label_id = test_case_label_id
}).perform())

const former = Former.build({
  name: test_case_label.value.name,
  description: test_case_label.value.description,
})

former.perform = async function() {
  await new q.project.TestCaseLabelInfoReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.test_case_label_id = test_case_label_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/test_case_labels')
}
</script>
