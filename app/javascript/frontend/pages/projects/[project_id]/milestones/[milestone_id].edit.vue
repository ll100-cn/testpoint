<template>
  <PageHeader>
    <PageTitle>编辑里程碑</PageTitle>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>编辑里程碑</Button>
          <Button variant="secondary" :to="`/projects/${project_id}/milestones`">取消</Button>
        </div>
      </FormGroup>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import * as q from '@/requests'
import _ from 'lodash'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import { useQueryLine } from '@/lib/useQueryLine'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any

const project_id = params.project_id
const milestone_id = params.milestone_id

const former = Former.build({
  title: null as string | null,
  published_at: null as Date | null,
  description: null as string | null,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { data: milestone_box } = line.request(q.project.milestones.Get(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.milestone_id = milestone_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const { mutateAsync: update_milestone_action } = line.request(q.project.milestones.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await update_milestone_action({
    interpolations: { project_id, id: params.milestone_id },
    body: former.form,
  })

  router.push(`/projects/${project_id}/milestones`)
}

former.form.title = milestone_box.value.milestone.title
former.form.published_at = milestone_box.value.milestone.published_at ?? null
former.form.description = milestone_box.value.milestone.description ?? null
</script>
