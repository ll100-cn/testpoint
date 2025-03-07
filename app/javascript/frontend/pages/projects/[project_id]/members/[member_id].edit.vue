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
import * as q from '@/lib/requests'
import useRequestList from '@bbb/useRequestList'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, FormFactory, Separator } from '@/ui'
import { Button } from '@/ui'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any

const project_id = params.project_id
const member_id = params.member_id

const member = reqs.add(q.project.members.Get).setup(req => {
  req.interpolations.project_id = project_id
  req.interpolations.member_id = member_id
}).wait()
await reqs.performAll()

const former = Former.build({
  nickname: member.value.name,
  role: member.value.role
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await reqs.add(q.project.members.Update).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.member_id = member_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/members')
}
</script>
