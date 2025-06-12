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
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Separator } from '$ui/separator'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import * as q from '@/requests'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryLine } from '@/lib/useQueryLine'
import Fields from './Fields.vue'

const router = useRouter()
const line = useQueryLine()

const former = Former.build({
  name: "",
  webhook_url: "",
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_project_action } = line.request(q.admin.projects.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await create_project_action({
    body: former.form,
  })
  router.push("/projects")
}
</script>
