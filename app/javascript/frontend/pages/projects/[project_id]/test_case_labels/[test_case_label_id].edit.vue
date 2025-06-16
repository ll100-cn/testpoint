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
          <Button variant="secondary" :to="`${path_info.collection}`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from '@/lib/PathHelper'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any

const project_id = params.project_id as string
const test_case_label_id = params.test_case_label_id
const path_info = PathHelper.parseMember(route.path, 'edit')

const { data: test_case_label_box } = line.request(q.project.test_case_labels.Get(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.test_case_label_id = test_case_label_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const former = Former.build({
  name: test_case_label_box.value.test_case_label.name,
  description: test_case_label_box.value.test_case_label.description,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_test_case_label_action } = line.request(q.project.test_case_labels.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await update_test_case_label_action({
    interpolations: { project_id, test_case_label_id },
    body: former.form,
  })

  router.push(path_info.collection)
}
</script>
