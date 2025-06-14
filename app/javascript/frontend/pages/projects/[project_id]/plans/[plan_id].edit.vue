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
import useRequestList from '@/lib/useRequestList'
import _ from 'lodash'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Separator } from '$ui/separator'
import { Button } from '$ui/button'
import { Validator } from '$ui/simple_form'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const project_id = _.toNumber(params.project_id)
const plan_id = _.toNumber(params.plan_id)

const plan_box = reqs.add(q.test.plans.InfoGet).setup(req => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).wait()
const platform_page = reqs.add(q.project.platforms.List).setup(req => {
  req.interpolations.project_id = project_id
}).wait()
await reqs.performAll()

const platform_boxes = computed(() => platform_page.value.list)

const validator = reactive<Validator>(new Validator())

const former = Former.build({
  title: plan_box.value.plan.title,
  platform_id: plan_box.value.plan.platform_id,
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  await reqs.add(q.test.plans.Update).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform(this.form)

  router.push(`/projects/${project_id}/plans/${plan_id}`)
}

function onCancel() {
  router.push(`/projects/${project_id}/plans/${plan_id}`)
}

async function onDestroy() {
  if (!confirm("确认删除？")) {
    return
  }

  await reqs.add(q.test.plans.Destroy).setup(req => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform()

  router.push(`/projects/${project_id}/plans`)
}

</script>
