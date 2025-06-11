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
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any

const project_id = params.project_id
const member_id = params.member_id

const { data: member_box } = line.request(q.project.members.Get, (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.member_id = member_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const former = Former.build({
  nickname: member_box.value.member.name,
  role: member_box.value.member.role
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_member_action } = line.request(q.project.members.Update, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await update_member_action({
    interpolations: { project_id, member_id },
    body: former.form,
  })

  router.push('/projects/' + project_id + '/members')
}
</script>
