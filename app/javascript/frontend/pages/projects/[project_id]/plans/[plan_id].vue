<template>
  <PageHeader>
    <PageTitle class="me-3">{{ plan_info.title }}</PageTitle>

    <div class="flex">
      <div class="px-2">
        <span class="text-secondary font-bold">
          平台: {{ plan_info.platform.name }}
        </span>
      </div>

      <Separator orientation="vertical" class="h-auto" />

      <div class="px-2">
        <span class="text-secondary font-bold">
          创建人: {{ plan_info.creator_name }}
        </span>
      </div>
    </div>

    <template #actions>
      <Button preset="ghost" v-if="allow('update', plan_info)" :to="`${plan_id}/edit`">设置</Button>
    </template>
  </PageHeader>


  <Nav v-bind:model-value="current_phase_info.id.toString()">
    <NavList preset="pill" class="mb-4">
      <NavItem v-for="(phase, index) in plan_info.phase_infos" :value="phase.id.toString()" as-child>
        <router-link :to="{ query: { phase_index: index } }">
          <span>{{ phase.title }}</span>
        </router-link>
      </NavItem>
      <NavItem value="" v-if="allow('create', Phase)" @click.prevent="phase_dialog.show(PlanPhaseCreateDialogContent)">
        <i class="far fa-plus-circle me-1" />
        <span>开始新一轮测试</span>
      </NavItem>
    </NavList>
  </Nav>

  <Card>
    <CardHeader>
      <CardTitle>任务列表</CardTitle>

      <template #actions>
        <Form preset="inline" size="sm" :former="searcher">
          <FormGroup path="state_eq" label="状态">
            <controls.Selectpicker>
              <SelectdropItem value="pending"><TaskStateLabel state="pending" /></SelectdropItem>
              <SelectdropItem value="pass"><TaskStateLabel state="pass" /></SelectdropItem>
              <SelectdropItem value="failure"><TaskStateLabel state="failure" /></SelectdropItem>
            </controls.Selectpicker>
          </FormGroup>

          <FormGroup path="state_modify_is" label="本轮操作">
            <controls.Selectpicker>
              <SelectdropItem value="not_overrided">未操作</SelectdropItem>
              <SelectdropItem value="overrided">已操作</SelectdropItem>
            </controls.Selectpicker>
          </FormGroup>
        </Form>
      </template>
    </CardHeader>

    <CardContent class="flex">
      <div class="flex-1">
        <FolderSide :filter="filter" :test_case_stats="test_case_stats" />
      </div>

      <Separator orientation="vertical" class="h-auto" />

      <div class="w-full md:w-3/4 xl:w-5/6 px-4">
        <TaskRow v-for="task_upshot_info in avaiable_task_upshot_infos" :task_upshot_info="task_upshot_info" @click="task_upshot_info_dialog.show(TaskUpshotInfoDialogContent, task_upshot_info)" />
      </div>
    </CardContent>
  </Card>

  <teleport to="body">
    <BlankDialog ref="phase_dialog" :plan_info="plan_info" @created="onPhaseCreated" />
    <BlankDialog ref="task_upshot_info_dialog" :plan_info="plan_info" :current_phase_id="current_phase_info.id" @updated="onTaskUpshotInfoUpdated" />
  </teleport>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
import * as q from '@/lib/requests'
import { Phase, TaskUpshotInfo, TestCaseStat } from '@/models'
import { usePageStore } from '@/store'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, getCurrentInstance, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FolderSide from '../FolderSide.vue'
import { type ChangeFilterFunction, ColumnFilter, Filter } from '../types'
import PlanPhaseCreateDialogContent from './PlanPhaseCreateDialogContent.vue'
import TaskRow from './TaskRow.vue'
import TaskUpshotInfoDialogContent from './TaskUpshotInfoDialogContent.vue'
import TaskStateLabel from '@/components/TaskStateLabel.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState, Separator } from '@/ui'
import BlankDialog from '@/ui/BlankDialog.vue'
import { Nav, NavList, NavItem } from '@/ui'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow
const query = route.query
const phase_dialog = ref(null! as InstanceType<typeof BlankDialog>)
const task_upshot_info_dialog = ref(null! as InstanceType<typeof BlankDialog>)

const searcher = Former.build({
  state_eq: null as string | null,
  state_modify_is: null as string | null,
})

const { Form, FormGroup } = FormFactory<typeof searcher.form>()

const project_id = _.toNumber(params.project_id)
const plan_id = _.toNumber(params.plan_id)

const plan_info = ref(await new q.test.plans.InfoGet().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.interpolations.plan_id = plan_id
}).perform())

const current_phase_info = computed(() => {
  const phase_infos = plan_info.value.phase_infos
  return phase_infos[_.toNumber(query.phase_index)] ?? phase_infos[phase_infos.length - 1]
})

const task_upshot_infos = ref(await new q.test.task_upshots.InfoList().setup(proxy, (req) => {
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
