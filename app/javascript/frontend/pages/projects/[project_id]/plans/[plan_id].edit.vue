<template>
  <div class="card">
    <div class="card-header bg-white">修改计划</div>

    <layouts.form_horizontal v-bind="{ former }" @submit.prevent="former.submit">
      <div class="card-body">
        <Fields :platforms="platforms" />
      </div>

      <div class="card-footer bg-white">
        <div class="d-flex justify-content-between">
          <div>
            <button class="btn btn-danger" type="button" @click="onDestroy">删除</button>
          </div>
          <div class="x-actions">
            <button class="btn btn-secondary" type="button" @click="onCancel">取消</button>
            <layouts.submit>更新计划</layouts.submit>
          </div>
        </div>
      </div>
    </layouts.form_horizontal>
  </div>
</template>

<script setup lang="ts">
import { Validations, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as requests from '@/lib/requests'
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

const plan = ref(await new requests.PlanReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const platforms = ref(await new requests.PlatformReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const validations = reactive<Validations>(new Validations())

const former = Former.build({
  title: plan.value.title,
  platform_id: plan.value.platform_id,
})

former.perform = async function() {
  await new requests.PlanReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform(this.form)

  router.push({ path: `/projects/${project_id}/plans/${plan_id}`, params: { project_id } })
}


function onCancel() {
  router.push({ path: `/projects/${project_id}/plans/${plan_id}`, params: { project_id } })
}

async function onDestroy() {
  const plan = await new requests.PlanReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform()

  router.push({ path: `/projects/${project_id}/plans`, params: { project_id } })
}

</script>
