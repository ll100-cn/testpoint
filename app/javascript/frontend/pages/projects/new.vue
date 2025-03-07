<template>
  <PageHeader>
    <PageTitle>新增项目</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增项目</Button>
          <Button variant="secondary" to="/projects">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Former, FormFactory } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'
import useRequestList from '@bbb/useRequestList'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Fields from './Fields.vue'

const router = useRouter()
const reqs = useRequestList()

const former = Former.build({
  name: "",
  webhook_url: "",
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await reqs.add(q.admin.projects.Create).setup(req => {
  }).perform(this.form)
  router.push("/projects")
}
</script>
