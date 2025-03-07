<template>
  <PageHeader>
    <PageTitle>新增成员</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former">
        <template #default>
          <FormGroup path="user_email" label="邮箱">
            <controls.string />
          </FormGroup>
        </template>
      </Fields>

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增成员</Button>
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
import { Former, FormFactory } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import Separator from '$ui/separator/Separator.vue'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  user_email: "",
  nickname: "",
  role: ""
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await reqs.add(q.project.members.Create).setup(req => {
    req.interpolations.project_id = project_id
  }).perform(this.form)

  router.push('/projects/' + project_id + '/members')
}
</script>
