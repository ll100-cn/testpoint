<template>
  <PageHeader>
    <PageTitle>新增成员</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <Fields v-bind="{ former }" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增成员</Button>
          <Button variant="secondary" to="/users">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Button, Former, FormFactory, Separator } from '@/ui'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Fields from './Fields.vue'

const router = useRouter()
const proxy = getCurrentInstance()!.proxy!

const former = Former.build({
  email: "",
  name: ""
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const user = await new q.admin.UserReq.Create().setup(proxy).perform(this.form)
  router.push("/users")
}

</script>
