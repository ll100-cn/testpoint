<template>
  <PageHeader>
    <PageTitle>修改标签</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>修改标签</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/test_case_labels`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, FormFactory, PresenterConfigProvider, Separator } from '$vendor/ui'
import { Button } from '$vendor/ui'

const route = useRoute()
const router = useRouter()
const proxy = getCurrentInstance()!.proxy as any
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

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.project.TestCaseLabelInfoReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.test_case_label_id = test_case_label_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/test_case_labels')
}
</script>
