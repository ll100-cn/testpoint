<template>
  <div class="card app-card-main">
    <div class="card-header bg-white d-flex">
      <h4 class="me-auto my-auto">任务列表</h4>

      <div class="dropdown ms-3">
        状态：
        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          全部
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item active" href="/testpoint/projects/1/plans/161?q%5Bstate_eq%5D=">全部</a>
          <a class="dropdown-item " href="/testpoint/projects/1/plans/161?q%5Bstate_eq%5D=pending">待测试</a>
          <a class="dropdown-item " href="/testpoint/projects/1/plans/161?q%5Bstate_eq%5D=pass">通过</a>
          <a class="dropdown-item " href="/testpoint/projects/1/plans/161?q%5Bstate_eq%5D=failure">不通过</a>
        </div>
      </div>

      <div class="dropdown ms-3">
        本轮操作：
        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          全部
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item active" href="/testpoint/projects/1/plans/161?q%5Bstate_modify_is%5D=">全部</a>
          <a class="dropdown-item " href="/testpoint/projects/1/plans/161?q%5Bstate_modify_is%5D=not_overrided">未操作</a>
          <a class="dropdown-item " href="/testpoint/projects/1/plans/161?q%5Bstate_modify_is%5D=overrided">已操作</a>
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
import _ from 'lodash';
import { computed, getCurrentInstance, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as requests from '@/requests'
import { TaskUpshotInfo, TestCaseStat } from '@/models';
import { plainToClass } from 'class-transformer';
import { ChangeFilterFunction, ColumnFilter, Filter } from '../types';
import FolderSide from '../FolderSide.vue'
import TaskRow from './TaskRow.vue';

const { proxy } = getCurrentInstance()
const route = useRoute()

const project_id = _.toNumber(route.params.project_id)
const plan_id = _.toNumber(route.params.id)
const phase_index = _.toNumber(route.query.phase_index)
const task_upshot_infos = ref(await new requests.TaskUpshotInfoList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
  req.interpolations.phase_index = phase_index
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
    req.interpolations.phase_index = phase_index
    req.interpolations.id = id
  }).perform()

  const index = _.findIndex(task_upshot_infos.value, (it) => it.id == task_upshot_info.id)
  task_upshot_infos.value[index] = task_upshot_info
}
</script>
