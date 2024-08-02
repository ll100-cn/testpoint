<template>
  <PageHeader>
    <PageTitle>编辑用户</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <Fields v-bind="{ former }" mode="edit" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>编辑用户</Button>
          <Button variant="secondary" to="/users">返回</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Button, Former, FormFactory, Separator } from '$vendor/ui'

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const router = useRouter()
const params = route.params as any

const user = await new q.admin.UserReq.Get().setup(proxy, (req) => {
  req.interpolations.id = params.user_id
}).perform()

const former = Former.build({
  email: user.email,
  name: user.name
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.admin.UserReq.Update().setup(proxy, (req) => {
    req.interpolations.id = user.id
  }).perform(this.form)

  router.push(`/users`)
}

</script>
