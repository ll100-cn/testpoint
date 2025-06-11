<template>
  <PageHeader>
    <PageTitle>新增里程碑</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>新增里程碑</Button>
          <Button variant="secondary" :to="`/projects/${params.project_id}/milestones`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import useRequestList from '@/lib/useRequestList'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import * as q from '@/requests'
import { useRoute, useRouter } from 'vue-router'
import { useQueryLine } from '@/lib/useQueryLine'
import Fields from './Fields.vue'

const reqs = useRequestList()
const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const former = Former.build({
  title: null as string | null,
  published_at: null as string | null,
  description: null as string | null,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_milestone_action } = line.request(q.project.milestones.Create, (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await create_milestone_action({
    interpolations: { project_id: params.project_id },
    body: former.form,
  })

  router.push(`/projects/${params.project_id}/milestones`)
}
</script>
