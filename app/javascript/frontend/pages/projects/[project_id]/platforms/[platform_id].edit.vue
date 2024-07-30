<template>
  <PageHeader>
    <PageTitle>修改平台</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" :members="members" :project_id="project_id" />

      <hr class="x-form-divider-through">

      <div class="space-x-3">
        <Button>修改平台</Button>
        <Button variant="secondary" :to="`/projects/${project_id}/platforms`">取消</Button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import { usePageStore } from "@/store"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const params = route.params as any
const page = usePageStore()

const project_id = params.project_id
const platform_id = params.platform_id
const platform = ref(await new q.project.PlatformReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.platform_id = platform_id
}).perform())

const members = ref(await page.inProject().request(q.project.MemberInfoReq.List).setup(proxy).perform())

const former = Former.build({
  name: platform.value.name,
  default_assignee_id: platform.value.default_assignee_id,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.project.PlatformReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.platform_id = platform_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/platforms')
}
</script>
