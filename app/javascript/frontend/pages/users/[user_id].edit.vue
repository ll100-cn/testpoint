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
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const user_box = reqs.add(q.admin.users.Get).setup(req => {
  req.interpolations.id = params.user_id
}).wait()
await reqs.performAll()

const former = Former.build({
  email: user_box.value.user.email,
  name: user_box.value.user.name
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await reqs.add(q.admin.users.Update).setup(req => {
    req.interpolations.id = user_box.value.user.id
  }).perform(this.form)

  router.push(`/users`)
}

</script>
