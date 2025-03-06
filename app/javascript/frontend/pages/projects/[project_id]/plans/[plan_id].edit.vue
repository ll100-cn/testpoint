<template>
  <PageHeader>
    <PageTitle>修改计划</PageTitle>

    <template #actions>
      <a class="btn btn-link text-danger" type="button" @click="onDestroy">删除</a>
    </template>
  </PageHeader>

  <Form preset="horizontal" v-bind="{ former }" @submit.prevent="former.perform()">
    <div class="w-full max-w-4xl mx-auto">
      <Fields :former="former" :platforms="platforms" />

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
import * as q from '@/lib/requests'
import _ from 'lodash'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Former, FormFactory, PresenterConfigProvider, Separator } from '@/ui'
import { Button } from '@/ui'
import Validator from '@/ui/simple_form/Validator';

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = _.toNumber(params.project_id)
const plan_id = _.toNumber(params.plan_id)

const plan = ref(await new q.test.plans.InfoGet().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const platforms = ref(await new q.project.platforms.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const validator = reactive<Validator>(new Validator())

const former = Former.build({
  title: plan.value.title,
  platform_id: plan.value.platform_id,
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  await new q.test.plans.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform(this.form)

  router.push({ path: `/projects/${project_id}/plans/${plan_id}`, params: { project_id } })
}


function onCancel() {
  router.push({ path: `/projects/${project_id}/plans/${plan_id}`, params: { project_id } })
}

async function onDestroy() {
  if (!confirm("确认删除？")) {
    return
  }

  const plan = await new q.test.plans.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform()

  router.push({ path: `/projects/${project_id}/plans`, params: { project_id } })
}

</script>
