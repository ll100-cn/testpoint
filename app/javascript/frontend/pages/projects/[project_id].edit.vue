<template>
  <PageHeader>
    <PageTitle>编辑项目</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
      <div class="mx-auto w-full max-w-4xl">
        <Fields :former="former" />

        <Separator class="my-4" preset="through" />

        <FormGroup label="">
          <div class="space-x-3">
            <Button>编辑项目</Button>
            <Button variant="secondary" to="/projects">取消</Button>
          </div>
        </FormGroup>
      </div>
  </Form>
</template>

<route>
{
  "meta": {
    "profile": false
  }
}
</route>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import { useQueryLine } from '@/lib/useQueryLine'

const reqs = useRequestList()
const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const { data: project_box } = line.request(q.admin.projects.Get, (req, it) => {
  req.interpolations.project_id = params.project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const former = Former.build({
  name: project_box.value.project.name,
  webhook_url: project_box.value.project.webhook_url,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_project_action } = line.request(q.admin.projects.Update, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await update_project_action({
    interpolations: { id: project_box.value.project.id },
    body: former.form,
  })

  router.push(`/projects`)
}

</script>
