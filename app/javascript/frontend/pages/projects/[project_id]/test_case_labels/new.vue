<template>
  <PageHeader>
    <PageTitle>新增标签</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增标签</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/test_case_labels`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  name: "",
  description: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_test_case_label_action } = line.request(q.project.test_case_labels.InfoCreate, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await create_test_case_label_action({
    interpolations: { project_id },
    body: former.form,
  })

  router.push('/projects/' + project_id + '/test_case_labels')
}
</script>
