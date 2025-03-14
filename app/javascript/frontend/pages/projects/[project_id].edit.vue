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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project = reqs.add(q.admin.projects.Get).setup(req => {
  req.interpolations.project_id = params.project_id
}).wait()
await reqs.performAll()

const former = Former.build({
  name: project.value.name,
  webhook_url: project.value.webhook_url,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await reqs.add(q.admin.projects.Update).setup(req => {
    req.interpolations.id = project.value.id
  }).perform(this.form)

  router.push(`/projects`)
}

</script>
