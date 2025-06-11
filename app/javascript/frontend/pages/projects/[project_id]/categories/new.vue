<template>
  <PageHeader>
    <PageTitle>新增分类</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="mx-auto w-full max-w-4xl">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增分类</Button>
          <Button variant="secondary" :to="`/projects/${params.project_id}/categories`">取消</Button>
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
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const router = useRouter()
const reqs = useRequestList()
const params = route.params as any
const line = useQueryLine()

const former = Former.build({
  name: "",
  description: "",
  color: "#ace0ef"
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_category_action } = line.request(q.project.categories.InfoCreate, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await create_category_action({
    interpolations: { project_id: params.project_id },
    body: former.form,
  })

  router.push('/projects/' + params.project_id + '/categories')
}
</script>
