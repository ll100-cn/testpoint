<template>
  <div class="card">
    <div class="card-header bg-white">修改计划</div>

    <div class="card-body">
      <PlanForm :form="form" :validations="validations" :platforms="platforms" />
    </div>
    <div class="card-footer bg-white">
      <div class="d-flex justify-content-between">
        <div>
          <button class="btn btn-danger" @click="onDestroy">删除</button>
        </div>
        <div class="x-actions">
          <button class="btn btn-secondary" @click="onCancel">取消</button>
          <SubmitButton submit_text="更新计划" :func="onSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Validations } from '@/components/simple_form';
import * as requests from '@/lib/requests';
import _ from 'lodash';
import PlanForm from './PlanForm.vue';
import SubmitButton from '@/components/SubmitButton.vue';

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

const form = ref({
  title: plan.value.title,
  platform_id: plan.value.platform_id,
})

function onCancel() {
  router.push({ path: `/projects/${project_id}/plans/${plan_id}`, params: { project_id } })
}

async function onSubmit() {
  validations.clear()
  try {
    const plan = await new requests.PlanReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.plan_id = plan_id
    }).perform(form.value)

    if (plan) {
      router.push({ path: `/projects/${project_id}/plans/${plan_id}`, params: { project_id } })
    }
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

async function onDestroy() {
  const plan = await new requests.PlanReq.Destroy().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
  }).perform()

  router.push({ path: `/projects/${project_id}/plans`, params: { project_id } })
}

</script>
