<template>
  <div class="page-header d-flex">
    <h2 class="me-3">{{ plan.title }}</h2>

    <div class="border-start">
      <h4>
        <span class="badge bg-light text-dark">
          平台: {{ plan.platform.name }}
        </span>
      </h4>
    </div>

    <a class="ms-auto btn btn-link" @click="utils.redirect(`/projects/${project_id}/plans/${plan_id}/edit`)">设置</a>
  </div>

  <ul class="nav nav-pills">
    <li v-for="(phase, index) in phase_infos" :key="phase.id" class="nav-item mb-3 mx-3">
      <router-link :to="{ query: { phase_index: index } }" class="nav-link" :class="{ active: index == currentQuery.phase_index }">
        <span>{{ phase.title }}</span>
      </router-link>
    </li>
    <li class="nav-item mb-3 mx-3">
      <a class="nav-link" href="javascript:void(0)" @click="PlanPhaseCreateModalRef.show()">
        <i class="far fa-plus-circle me-1" /><span>开始新一轮测试</span>
      </a>
    </li>
  </ul>

  <PlanPhaseCreateModal
    ref="PlanPhaseCreateModalRef"
    :phase_infos="phase_infos"
    :plan="plan"
    :task_upshot_infos="task_upshot_infos"
    @created="router.push({ query: { phase_index: phase_infos.length } })" />
  <div class="card app-card-main">
    <div class="card-header bg-white d-flex">
      <h4 class="me-auto my-auto">任务列表</h4>

      <div class="dropdown ms-3">
        状态：
        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {{ stateDropdownOptions[state_eq || ""] }}
        </button>
        <div class="dropdown-menu">
          <a
            v-for="(option, key) in stateDropdownOptions"
            :key="key"
            class="dropdown-item"
            :class="{ active: key == state_eq }"
            @click="state_eq = key">{{ option }}</a>
        </div>
      </div>

      <div class="dropdown ms-3">
        本轮操作：
        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {{ stateModifyIsDropdownOptions[state_modify_is || ""] }}
        </button>
        <div class="dropdown-menu">
          <a
            v-for="(option, key) in stateModifyIsDropdownOptions"
            :key="key"
            class="dropdown-item"
            :class="{ active: key == state_modify_is }"
            @click="state_modify_is = key">{{ option }}</a>
        </div>
      </div>
    </div>

    <div class="card-body p-0 d-flex align-items-stretch">
      <div class="col-12 col-md-3 col-xl-2 border-end p-3">
        <FolderSide :filter="filter" :test_case_stats="test_case_stats" />
      </div>

      <div class="col-12 col-md-9 col-xl-10">
        <div id="tp-main">
          <div class="test_cases-cards">
            <TaskRow v-for="task_upshot_info in avaiable_task_upshot_infos" :key="task_upshot_info.id" :task_upshot_info="task_upshot_info" @change="onTaskChanged" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { TaskUpshotInfo, TestCaseStat } from '@/models';
import * as requests from '@/requests';
import { plainToClass } from 'class-transformer';
import _ from 'lodash';
import { ChangeFilterFunction, ColumnFilter, Filter } from '../types';
import * as utils from '@/lib/utils'

import FolderSide from '../FolderSide.vue';
import PlanPhaseCreateModal from './PlanPhaseCreateModal.vue';
import TaskRow from './TaskRow.vue';

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()

const currentQuery = ref({
  phase_index: _.toNumber(route.query.phase_index) || 0,
})

const state_eq = ref("")
const state_modify_is = ref("")

const PlanPhaseCreateModalRef = ref<InstanceType<typeof PlanPhaseCreateModal>>()
const project_id = _.toNumber(route.params.project_id)
const plan_id = _.toNumber(route.params.id)
const stateDropdownOptions = {
  '': '全部',
  pending: '待测试',
  pass: '通过',
  failure: '不通过',
}

const stateModifyIsDropdownOptions = {
  '': '全部',
  not_overrided: '未操作',
  overrided: '已操作',
}

const task_upshot_infos = ref(await new requests.TaskUpshotInfoList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
  req.interpolations.phase_index = currentQuery.value.phase_index
}).perform())

const plan = ref(await new requests.PlanShow().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const phase_infos = ref(await new requests.PlanPhaseInfoList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const filter = ref(new Filter())
filter.value.archived = null

const test_case_stats = computed(() => {
  const result = _(task_upshot_infos.value).groupBy((it) => {
    const test_case = it.test_case
    return JSON.stringify({ archived: test_case.archived, role_name: test_case.role_name, scene_path: test_case.scene_path })
  }).mapValues((it) => {
    return it.length
  }).map((count, json) => {
    const stat = plainToClass(TestCaseStat, JSON.parse(json))
    stat.count = count
    return stat
  }).value()

  return result
})

const columns = new ColumnFilter()
const avaiable_task_upshot_infos = computed(() => {
  return _.filter(task_upshot_infos.value, (it) => {
    const test_case = it.test_case
    if (state_eq.value !== '') {
      if (it.state !== state_eq.value) {
        return false
      }
    }

    if (state_modify_is.value !== '') {
      if (it.state_override !== null && state_modify_is.value === 'not_overrided') {
        return false
      }

      if (!_.includes([ "pass", "failure" ], it.state_override) && state_modify_is.value === 'overrided') {
        return false
      }
    }

    return filter.value.isMatch(test_case, columns)
  })
})

const changeFilter: ChangeFilterFunction = (overrides) => {
  filter.value = _.assign(filter.value, overrides)
}

provide("changeFilter", changeFilter)

async function onTaskChanged(old_task_upshot_info: TaskUpshotInfo) {
  const id = old_task_upshot_info.id
  const task_upshot_info = await new requests.TaskUpshotInfoShow().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
    req.interpolations.phase_index = currentQuery.value.phase_index
    req.interpolations.id = id
  }).perform()

  const index = _.findIndex(task_upshot_infos.value, (it) => it.id == task_upshot_info.id)
  task_upshot_infos.value[index] = task_upshot_info
}
</script>
