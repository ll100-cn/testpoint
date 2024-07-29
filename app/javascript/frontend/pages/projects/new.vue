<template>
  <PageHeader>
    <PageTitle>新增项目</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <Fields :former="former" />

      <hr class="x-form-divider-through">

      <div class="space-x-3">
        <Button>新增项目</Button>
        <Button variant="secondary" to="/projects">取消</Button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Button, Former, FormFactory } from '$vendor/ui'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Fields from './Fields.vue'

const router = useRouter()
const proxy = getCurrentInstance()!.proxy!

const former = Former.build({
  name: "",
  webhook_url: "",
})

const { Form } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.admin.ProjectReq.Create().setup(proxy).perform(this.form)
  router.push("/projects")
}
</script>
