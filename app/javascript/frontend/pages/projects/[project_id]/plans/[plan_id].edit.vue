<template>
  <div class="page-header">
    <h2>修改计划</h2>
    <div class="x-actions x-spacer-2 ms-auto">
      <a class="btn btn-link text-danger" type="button" @click="onDestroy">删除</a>
    </div>
  </div>

  <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
    <div class="row">
      <div class="col-xxl-8 col-xl-10 col-12 mx-auto">
        <Fields :platforms="platforms" />

        <hr class="x-form-divider-through">

        <layouts.group control_wrap_class="x-actions x-spacer-2">
          <layouts.submit>更新计划</layouts.submit>
          <button class="btn btn-secondary" type="button" @click="onCancel">取消</button>
        </layouts.group>
      </div>
    </div>
  </layouts.form_horizontal>
</template>

<script setup lang="ts">
import { Validations, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import _ from 'lodash'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Fields from './Fields.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const project_id = _.toNumber(params.project_id)
const plan_id = _.toNumber(params.plan_id)

const plan = ref(await new q.test.PlanReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const platforms = ref(await new q.project.PlatformReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const validations = reactive<Validations>(new Validations())

const former = Former.build({
  title: plan.value.title,
  platform_id: plan.value.platform_id,
})

former.perform = async function() {
  await new q.test.PlanReq.Update().setup(proxy, (req) => {
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

  const plan = await new q.test.PlanReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform()

  router.push({ path: `/projects/${project_id}/plans`, params: { project_id } })
}

</script>
