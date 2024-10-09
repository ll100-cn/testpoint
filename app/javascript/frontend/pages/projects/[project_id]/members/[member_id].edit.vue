<template>
  <PageHeader>
    <PageTitle>修改成员</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>修改成员</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/members`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/requests'
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

const project_id = params.project_id
const member_id = params.member_id
const member = ref(await new q.project.MemberReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.member_id = member_id
}).perform())

const former = Former.build({
  nickname: member.value.name,
  role: member.value.role
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.project.MemberReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.member_id = member_id
  }).perform(this.form)
  router.push('/projects/' + project_id + '/members')
}
</script>
