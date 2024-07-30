<template>
  <PageHeader>
    <PageTitle class="me-3">{{ plan_info.title }}</PageTitle>

    <div class="border-start px-2">
      <span class="text-dark fw-bold">
        平台: {{ plan_info.platform.name }}
      </span>
    </div>
    <div class="border-start px-2">
      <span class="text-dark fw-bold">
        创建人: {{ plan_info.creator_name }}
      </span>
    </div>

    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <router-link v-if="allow('update', plan_info)" class="ms-auto btn btn-link" :to="`${plan_id}/edit`">设置</router-link>
    </div>
  </PageHeader>

  <ul class="nav nav-pills">
    <li v-for="(phase, index) in plan_info.phase_infos" class="nav-item mb-3 mx-3">
      <router-link :to="{ query: { phase_index: index } }" class="nav-link" :class="{ active: phase.id == current_phase_info.id }">
        <span>{{ phase.title }}</span>
      </router-link>
    </li>
    <li class="nav-item mb-3 mx-3">
      <a v-if="allow('create', Phase)" class="nav-link" href="#" @click.prevent="phase_dialog.show(PlanPhaseCreateDialogContent)">
        <i class="far fa-plus-circle me-1" /><span>开始新一轮测试</span>
      </a>
    </li>
  </ul>

  <Card>
    <CardHeader>
      <h4 class="me-auto my-auto">任务列表</h4>

      <layouts.form_inline :former="searcher" :default_wrapper_config="{ size: 'small' }">
        <layouts.group code="state_eq" label="状态">
          <controls.dropdown #default="{ Component }">
            <component :is="Component" value="pending"><TaskStateLabel state="pending" /></component>
            <component :is="Component" value="pass"><TaskStateLabel state="pass" /></component>
            <component :is="Component" value="failure"><TaskStateLabel state="failure" /></component>
          </controls.dropdown>
        </layouts.group>

        <layouts.group code="state_modify_is" label="本轮操作">
          <controls.dropdown #default="{ Component }">
            <component :is="Component" value="not_overrided">未操作</component>
            <component :is="Component" value="overrided">已操作</component>
          </controls.dropdown>
        </layouts.group>
      </layouts.form_inline>
    </CardHeader>

    <CardContent class="row">
      <div class="col-12 col-md-3 col-xl-2 border-end p-3">
        <FolderSide :filter="filter" :test_case_stats="test_case_stats" />
      </div>

      <div class="col-12 col-md-9 col-xl-10">
        <div id="tp-main">
          <div class="test_cases-cards">
            <TaskRow v-for="task_upshot_info in avaiable_task_upshot_infos" :task_upshot_info="task_upshot_info" @click="task_upshot_info_dialog.show(TaskUpshotInfoDialogContent, task_upshot_info)" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <teleport to="body">
    <BlankDialog ref="phase_dialog" :plan_info="plan_info" @created="onPhaseCreated" />
    <BlankDialog ref="task_upshot_info_dialog" :plan_info="plan_info" :current_phase_id="current_phase_info.id" @updated="onTaskUpshotInfoUpdated" />
  </teleport>
</template>

<script setup lang="ts">
import { controls, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { Phase, TaskUpshotInfo, TestCaseStat } from '@/models'
import { usePageStore } from '@/store'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, getCurrentInstance, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FolderSide from '../FolderSide.vue'
import { ChangeFilterFunction, ColumnFilter, Filter } from '../types'
import PlanPhaseCreateDialogContent from './PlanPhaseCreateDialogContent.vue'
import TaskRow from './TaskRow.vue'
import TaskUpshotInfoDialogContent from './TaskUpshotInfoDialogContent.vue'
import TaskStateLabel from '@/components/TaskStateLabel.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import BlankDialog from '$vendor/ui/BlankDialog.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow
const query = route.query
const phase_dialog = ref(null as InstanceType<typeof BlankDialog>)
const task_upshot_info_dialog = ref(null as InstanceType<typeof BlankDialog>)

const searcher = Former.build({
  state_eq: null as string | null,
  state_modify_is: null as string | null,
})

const project_id = _.toNumber(params.project_id)
const plan_id = _.toNumber(params.plan_id)

const plan_info = ref(await new q.test.PlanInfoReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const current_phase_info = computed(() => {
  const phase_infos = plan_info.value.phase_infos
  return phase_infos[_.toNumber(query.phase_index)] ?? phase_infos[phase_infos.length - 1]
})

const task_upshot_infos = ref(await new q.test.TaskUpshotInfoReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
  req.interpolations.phase_id = current_phase_info.value.id
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

    if (searcher.form.state_eq) {
      if (it.state !== searcher.form.state_eq) {
        return false
      }
    }

    if (searcher.form.state_modify_is == 'not_overrided') {
      if (it.state_override !== null) {
        return false
      }
    }

    if (searcher.form.state_modify_is == 'overrided') {
      if (it.state_override === null) {
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

function onTaskUpshotInfoUpdated(task_upshot_info: TaskUpshotInfo) {
  const index = task_upshot_infos.value.findIndex(it => it.id == task_upshot_info.id)
  task_upshot_infos.value[index] = task_upshot_info

  const counts = _.countBy(task_upshot_infos.value, it => it.state)
  current_phase_info.value.upshots_state_counts = counts as any
}

function onPhaseCreated(phase: Phase) {
  router.push({ query: { phase_index: plan_info.value.phase_infos.length } })
}
</script>
