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
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any

const user_id = params.user_id
const { data: user_box } = line.request(q.admin.users.Get, (req, it) => {
  req.interpolations.id = user_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const former = Former.build({
  email: user_box.value.user.email,
  name: user_box.value.user.name
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_user_action } = line.request(q.admin.users.Update, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await update_user_action({
    interpolations: { id: user_box.value.user.id },
    body: former.form,
  })

  router.push(`/users`)
}

</script>
