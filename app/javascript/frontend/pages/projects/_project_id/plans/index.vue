<template>
  <div class="page-header justify-content-between">
    <h2>计划列表</h2>
    <button class="btn btn-primary" @click="PlanCreateModalRef.show()">新增计划</button>
  </div>
  <PlanCreateModal ref="PlanCreateModalRef" :platforms="platforms" :test_case_stats="test_case_stats" @created="getData" />

  <div class="page-filter x-actions">
    <div class="d-flex align-items-center">
      <label class="text-nowrap me-2">成员</label>
      <forms.select
        class="bg-light"
        v-bind="{
          form: { creator_id: current_creator_id },
          code: 'creator_id',
          collection: availiable_members,
          labelMethod: 'name',
          valueMethod: 'id',
          includeBlank: true
        }" @change="PaginationBarRef.queryChange({ page: 1, q: { creator_id_eq: ($event.target as HTMLInputElement).value } })" />
    </div>
    <button class="btn btn-secondary" @click="router.push({ query: {} })">重置</button>
  </div>
  <div class="row mb-3">
    <div v-for="plan in plans?.list" :key="plan.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <router-link :to="{ path: `plans/${plan.id}`, query: { phase_index: 0 } }">
        <div class="card">
          <div class="card-body">
            <div class="card-title d-flex align-items-center">
              <h4>{{ plan.title }}</h4>
              <span v-if="plan.milestone" class="badge bg-light text-dark ms-auto">{{ plan.milestone.title }}</span>
            </div>

            <div class="d-flex">
              <p><span>{{ _(plan.tasks_state_counts).values().sum() }} 个任务</span></p>
              <p class="ms-auto">
                <span class="badge" :style="{ backgroundColor: utils.calcColorHex(plan.platform.name) }">{{ plan.platform.name }}</span>
              </p>
            </div>

            <div class="progress" style="height: 0.5rem;">
              <template v-for="state in ['pass', 'failure']" :key="state">
                <div :class="`progress-bar ${progress_bg_mapping[state]}`" :style="`width: ${100.0 * plan.tasks_state_counts[state] / _(plan.tasks_state_counts).values().sum()}%`" />
              </template>
            </div>
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center bg-white">
            <small>{{ dayjs(plan.created_at).fromNow() }} {{ plan.creator_name }} 创建</small>
            <button class="btn btn-outline-primary btn-sm py-1 ms-auto text-nowrap">进入测试</button>
          </div>
        </div>
      </router-link>
    </div>
  </div>

  <PaginationBar ref="PaginationBarRef" :pagination="plans" :current-query="currentQuery" />
</template>

<script setup lang="ts">
import _ from 'lodash'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { forms } from "@/components/simple_form"
import dayjs from '@/lib/dayjs'
import * as utils from '@/lib/utils'
import * as requests from '@/requests'
import { PageQuery } from '@/types'
import qs from 'qs'

import PaginationBar from '@/components/PaginationBar.vue'
import PlanCreateModal from './PlanCreateModal.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const PlanCreateModalRef = ref<InstanceType<typeof PlanCreateModal>>()
const PaginationBarRef = ref<InstanceType<typeof PaginationBar>>()

const querystring = qs.stringify(route.query)
const query: PageQuery = qs.parse(querystring, { ignoreQueryPrefix: true })
const current_creator_id = ref(_.toInteger(query.q?.creator_id_eq))

const currentQuery = ref<PageQuery>({
  page: _.toInteger(query.page) || 1,
  q: {
    ...query.q,
    creator_id_eq: current_creator_id.value,
  } || {},
})

const project_id = _.toNumber(route.params.project_id)
const plans = ref()

const getData = async () => {
  plans.value = await new requests.PlanList().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.query = query
  }).perform()
}
await getData()
const platforms = ref(await new requests.PlatformList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const members = ref(await new requests.MemberList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const test_case_stats = ref(await new requests.TestCaseStatList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const progress_bg_mapping = ref({ pass: "bg-success", failure: "bg-danger" })

const availiable_members = computed(() => {
  return _(members.value).reject([ 'role', 'reporter' ]).sortBy('developer').value()
})

</script>
