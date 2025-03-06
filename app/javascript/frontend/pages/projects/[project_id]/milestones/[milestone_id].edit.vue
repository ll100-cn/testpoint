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
import { Button, Former, FormFactory, Separator } from '@/ui'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import * as q from '@/lib/requests'
import _ from 'lodash'
import { getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = params.project_id

const former = Former.build({
  title: null as string | null,
  published_at: null as Date | null,
  description: null as string | null,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.project.milestones.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.id = milestone.id
  }).perform(this.form)

  router.push(`/projects/${project_id}/milestones`)
}

const milestone = await new q.project.milestones.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.id = _.toNumber(params.milestone_id)
}).perform()

former.form.title = milestone.title
former.form.published_at = milestone.published_at
former.form.description = milestone.description
</script>
