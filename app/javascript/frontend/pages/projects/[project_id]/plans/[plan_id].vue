<template>
  <div class="page-header">
    <h2 class="me-3">{{ plan.title }}</h2>

    <div class="border-start px-2">
      <span class="text-dark fw-bold">
        平台: {{ plan.platform.name }}
      </span>
    </div>
    <div class="border-start px-2">
      <span class="text-dark fw-bold">
        创建人: {{ plan.creator_name }}
      </span>
    </div>

    <div class="d-flex ms-auto x-spacer-3">
      <router-link class="ms-auto btn btn-link" :to="`${plan_id}/edit`">设置</router-link>
    </div>
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
  <div class="card page-card">
    <div class="card-header bg-white d-flex">
      <h4 class="me-auto my-auto">任务列表</h4>

      <div class="dropdown ms-3">
        状态：
        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {{ state_dropdown_options[state_eq ?? ""] }}
        </button>
        <div class="dropdown-menu">
          <a
            v-for="(option, key) in state_dropdown_options"
            :key="key"
            class="dropdown-item"
            :class="{ active: key == state_eq }"
            @click="state_eq = key">{{ option }}</a>
        </div>
      </div>

      <div class="dropdown ms-3">
        本轮操作：
        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {{ state_modify_is_dropdown_options[state_modify_is ?? ""] }}
        </button>
        <div class="dropdown-menu">
          <a
            v-for="(option, key) in state_modify_is_dropdown_options"
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
            <TaskRow
              v-for="task_upshot_info in avaiable_task_upshot_infos"
              :key="task_upshot_info.id"
              :task_upshot_info="task_upshot_info"
              @change="onTaskChanged"
              @click="TaskModalRef.show($event.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <TaskModal
    ref="TaskModalRef"
    :plan="plan"
    :project_id="project_id"
    :phase_infos="phase_infos"
    :current_phase_id="phase_infos[currentQuery.phase_index].id"
    :issue_templates="issue_templates"
    @updated="onTaskChanged" />
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { TaskUpshotInfo, TestCaseStat } from '@/models';
import * as requests from '@/lib/requests';
import { plainToClass } from 'class-transformer';
import _ from 'lodash';
import { ChangeFilterFunction, ColumnFilter, Filter } from '../types';

import FolderSide from '../FolderSide.vue';
import PlanPhaseCreateModal from './PlanPhaseCreateModal.vue';
import TaskModal from './TaskModal.vue';
import TaskRow from './TaskRow.vue';

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any

const state_eq = ref("")
const state_modify_is = ref("")

const PlanPhaseCreateModalRef = ref<InstanceType<typeof PlanPhaseCreateModal>>()
const TaskModalRef = ref<InstanceType<typeof TaskModal>>()
const project_id = _.toNumber(params.project_id)
const plan_id = _.toNumber(params.plan_id)
const state_dropdown_options = {
  '': '全部',
  pending: '待测试',
  pass: '通过',
  failure: '不通过',
}

const state_modify_is_dropdown_options = {
  '': '全部',
  not_overrided: '未操作',
  overrided: '已操作',
}

const phase_infos = ref(await new requests.PlanPhaseInfoReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const currentQuery = ref({
  phase_index: _.toNumber(route.query.phase_index ?? phase_infos.value.length - 1 ?? 0),
})

const task_upshot_infos = ref(await new requests.TaskUpshotInfoReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
  req.interpolations.phase_index = currentQuery.value.phase_index
}).perform())

const plan = ref(await new requests.PlanReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const issue_templates = ref(await new requests.IssueTemplateReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const filter = ref(new Filter())
filter.value.archived = null

const test_case_stats = computed(() => {
  const result = _(task_upshot_infos.value).groupBy((it) => {
    const test_case = it.test_case
    return JSON.stringify({ ignored: it.is_ignored(), role_name: test_case.role_name, scene_path: test_case.scene_path })
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
      if (!_.includes([ "pass", "failure", "pending" ], it.state_override) && state_modify_is.value === 'overrided') {
        return false
      }
    }

    if (filter.value.ignored === "1") {
      if (!it.is_ignored()) {
        return false
      }
    } else {
      if (it.is_ignored()) {
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
  const task_upshot_info = await new requests.TaskUpshotInfoReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = project_id
    req.interpolations.plan_id = plan_id
    req.interpolations.phase_index = currentQuery.value.phase_index
    req.interpolations.id = id
  }).perform()

  const index = _.findIndex(task_upshot_infos.value, (it) => it.id == task_upshot_info.id)
  task_upshot_infos.value[index] = task_upshot_info
}
</script>
