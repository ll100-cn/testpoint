<template>
  <div class="page-header">
    <h2>新增标签</h2>
  </div>

  <FormHorizontal :validations="validations">
    <Fields :form="form" :project_id="project_id" :validations="validations" />

    <template #actions>
      <SubmitButton submit_text="新增标签" :func="onSubmit" />
      <router-link class="btn btn-secondary" :to="`/projects/${project_id}/test_case_labels`">取消</router-link>
    </template>
  </FormHorizontal>
</template>

<script setup lang="ts">
import FormHorizontal from '@/components/FormHorizontal.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { Validations } from "@/components/simple_form"
import * as requests from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

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
    const test_case_label = await new requests.TestCaseLabelReq.Create().setup(proxy, (req) => {
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
