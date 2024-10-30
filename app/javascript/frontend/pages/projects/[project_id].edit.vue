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
import { layouts } from '@/components/simple_form'
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Button, Former, FormFactory, Separator } from '@/ui'

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project = await new q.admin.ProjectReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = params.project_id
}).perform()

const former = Former.build({
  name: project.name,
  webhook_url: project.webhook_url,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.admin.ProjectReq.Update().setup(proxy, (req) => {
    req.interpolations.id = project.id
  }).perform(this.form)

  router.push(`/projects`)
}

</script>
