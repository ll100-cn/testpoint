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
import useRequestList from '@/lib/useRequestList'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  title: null as string | null,
  published_at: null as Date | null,
  description: null as string | null,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await reqs.add(q.project.milestones.Update).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.id = params.milestone_id
  }).perform(this.form)

  router.push(`/projects/${project_id}/milestones`)
}

const milestone_box = reqs.add(q.project.milestones.Get).setup(req => {
  req.interpolations.project_id = project_id
  req.interpolations.id = _.toNumber(params.milestone_id)
}).wait()
await reqs.performAll()

former.form.title = milestone_box.value.milestone.title
former.form.published_at = milestone_box.value.milestone.published_at ?? null
former.form.description = milestone_box.value.milestone.description ?? null
</script>
