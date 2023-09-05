<template>
  <div class="page-header">
    <h2>新增标签</h2>
  </div>

  <form>
    <Form :form="form" :project_id="project_id" :validations="validations" />
    <hr>
    <layouts.vertical_group label_class="col-2">
      <div class="x-actions">
        <SubmitButton submit_text="新增标签" :func="onSubmit" />
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
import Form from './Form.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any

const project_id = params.project_id
const validations = ref(new Validations())

const form = ref({
  name: "",
  description: "",
})

async function onSubmit() {
  validations.value.clear()

  try {
    const test_case_label = await new requests.TestCaseLabelCreate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
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
