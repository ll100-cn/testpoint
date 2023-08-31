<template>
  <div class="page-header">
    <h2>修改标签</h2>
  </div>

  <form>
    <Form :form="form" :project_id="project_id" :validations="validations" />
    <hr>
    <layouts.vertical_group label_class="col-2">
      <div class="x-actions">
        <SubmitButton submit_text="修改标签" :func="onSubmit" />
        <router-link class="btn btn-secondary" :to="`/projects/${project_id}/test_case_labels`">取消</router-link>
      </div>
    </layouts.vertical_group>
  </form>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Validations, layouts } from "@/components/simple_form"
import * as requests from '@/requests'

import SubmitButton from '@/components/SubmitButton.vue'
import Form from '../Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const project_id = route.params.project_id as string
const test_case_label_id = route.params.test_case_label_id
const validations = ref(new Validations())
const test_case_label = ref(await new requests.TestCaseLabelShow().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.test_case_label_id = test_case_label_id
}).perform())

const form = ref({
  name: test_case_label.value.name,
  description: test_case_label.value.description,
})

async function onSubmit() {
  validations.value.clear()

  try {
    const test_case_label = await new requests.TestCaseLabelUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.test_case_label_id = test_case_label_id
    }).perform(form.value)
    if (test_case_label) {
      router.push('/projects/' + project_id + '/test_case_labels')
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}

</script>
