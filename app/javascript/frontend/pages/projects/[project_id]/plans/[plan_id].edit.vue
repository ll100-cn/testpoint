<template>
  <PageHeader>
    <PageTitle>修改计划</PageTitle>

    <template #actions>
      <a class="btn btn-link text-danger" type="button" @click="onDestroy">删除</a>
    </template>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" :platform_boxes="platform_boxes" />

      <Separator class="my-4" preset="through" />

      <FormGroup label="">
        <div class="space-x-3">
          <Button>更新计划</Button>
          <Button variant="secondary" type="button" @click="onCancel">取消</Button>
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
import { computed, reactive } from 'vue'
import _ from 'lodash'
import { Validator } from '$ui/simple_form'

const route = useRoute()
const router = useRouter()
const line = useQueryLine()
const params = route.params as any

const project_id = params.project_id
const plan_id = params.plan_id

const { data: plan_box } = line.request(q.test.plans.Get(), (req, it) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
  return it.useQuery(req.toQueryConfig())
})
const { data: platform_boxes } = line.request(q.project.platforms.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const validator = reactive<Validator>(new Validator())

const former = Former.build({
  title: plan_box.value.plan.title,
  platform_id: plan_box.value.plan.platform_id,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_plan_action } = line.request(q.test.plans.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: destroy_plan_action } = line.request(q.test.plans.Destroy(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  await update_plan_action({
    interpolations: { project_id, plan_id },
    body: former.form,
  })

  router.push(`/projects/${project_id}/plans/${plan_id}`)
}

function onCancel() {
  router.push(`/projects/${project_id}/plans/${plan_id}`)
}

async function onDestroy() {
  if (!confirm("确认删除？")) {
    return
  }

  await destroy_plan_action({
    interpolations: { project_id, plan_id }
  })

  router.push(`/projects/${project_id}/plans`)
}

</script>
