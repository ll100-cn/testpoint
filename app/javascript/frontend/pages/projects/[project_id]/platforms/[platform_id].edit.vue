<template>
  <PageHeader>
    <PageTitle>修改平台</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" :members="members" :project_id="project_id" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>修改平台</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/platforms`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import { usePageStore, useSessionStore } from "@/store"
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, FormFactory, PresenterConfigProvider } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any
const page = usePageStore()
const session = useSessionStore()

const project_id = params.project_id
const platform_id = params.platform_id

const platform = reqs.add(q.project.platforms.Get).setup(req => {
  req.interpolations.project_id = project_id
  req.interpolations.platform_id = platform_id
}).wait()
const members = reqs.raw(session.request(q.project.members.InfoList, project_id)).setup().wait()
await reqs.performAll()

const former = Former.build({
  name: platform.value.name,
  icon_svg: platform.value.icon_svg,
  default_assignee_id: platform.value.default_assignee_id,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await reqs.add(q.project.platforms.Update).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.platform_id = platform_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/platforms')
}
</script>
