<template>
  <PageHeader>
    <PageTitle>计划列表</PageTitle>

    <template #actions>
      <Button v-if="allow('create', Plan)" @click.prevent="plan_dialog.show(PlanCreateDialogContent, test_case_stats)">新增计划</Button>
    </template>
  </PageHeader>

  <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()">
    <FormGroup path="creator_id_eq" label="成员">
      <controls.Select include-blank @update:model-value="onSearchInput">
        <OptionsForMember :collection="member_boxes" except_level="reporter" />
      </controls.Select>
    </FormGroup>
  </Form>

  <div class="grid grid-cols-3 gap-4 mt-4">
    <div v-for="plan_box in plan_page.list">
      <router-link :to="{ path: `plans/${plan_box.plan.id}` }">
        <Card>
          <CardContent class="flex flex-col gap-y-3">
            <div class="flex items-center">
              <h4 class="text-lg font-medium">{{ plan_box.plan.title }}</h4>
              <Badge v-if="plan_box.plan.milestone" preset="standard">{{ plan_box.plan.milestone.title }}</Badge>
            </div>

            <div class="flex">
              <p><span>{{ _(plan_box.tasks_state_counts).values().sum() }} 个任务</span></p>
              <p class="ms-auto">
                <Badge preset="standard" :style="{ backgroundColor: utils.calcColorHex(plan_box.plan.platform.name) }">
                  {{ plan_box.plan.platform.name }}
                </Badge>
              </p>
            </div>

            <div class="flex *:not-first:rounded-s-none *:not-last:rounded-e-none">
              <Progress preset="standard" :model-value="100" v-if="plan_box.tasks_state_counts!['failure'] ?? 0 > 0" class="text-destructive" :style="{ width: 100.0 * plan_box.tasks_state_counts!['failure'] / _(plan_box.tasks_state_counts!).values().sum() + '%' }" />
              <Progress preset="standard" :model-value="100" v-if="plan_box.tasks_state_counts!['pending'] ?? 0 > 0" class="text-muted" :style="{ width: 100.0 * plan_box.tasks_state_counts!['pending'] / _(plan_box.tasks_state_counts!).values().sum() + '%' }" />
              <Progress preset="standard" :model-value="100" v-if="plan_box.tasks_state_counts!['pass'] ?? 0 > 0" class="text-green-700" :style="{ width: 100.0 * plan_box.tasks_state_counts!['pass'] / _(plan_box.tasks_state_counts!).values().sum() + '%' }" />
            </div>
          </CardContent>

          <CardFooter>
            <small>{{ dayjs(plan_box.plan.created_at).fromNow() }} {{ plan_box.plan.creator_name }} 创建</small>
            <Button preset="outline" size="sm" class="py-1 ms-auto text-nowrap">进入测试</Button>
          </CardFooter>
        </Card>
      </router-link>
    </div>
  </div>

  <PaginationBar class="mt-2" :per_size_enabled="false" :pagination="plan_page" />

  <teleport to="body">
    <BlankDialog ref="plan_dialog" @created="onCreated" />
  </teleport>
</template>

<script setup lang="ts">
import PaginationBar from '@/components/PaginationBar.vue'
import dayjs from '@/lib/dayjs'
import * as q from '@/requests'
import * as utils from '@/lib/utils'
import _ from 'lodash'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as t from '@/lib/transforms'
import { usePageStore, useSessionStore } from '@/store'
import { Plan } from '@/models'
import OptionsForMember from '@/components/OptionsForMember.vue'
import { Badge } from '$ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import { Progress } from '$ui/progress'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as controls from '@/components/controls'
import BlankDialog from '@/components/BlankDialog.vue'
import PlanCreateDialogContent from './PlanCreateDialogContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import Button from '$ui/button/Button.vue'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const session = useSessionStore()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = route.query
const page = usePageStore()
const allow = page.inProject()!.allow
const plan_dialog = ref(null! as InstanceType<typeof BlankDialog>)

class Search {
  @t.Number creator_id_eq?: number = undefined
}

const search = utils.instance(Search, query)
const former = Former.build(search)

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const data = utils.compactObject(this.form)
  router.push({ query: utils.plainToQuery(data) })
}

const project_id = _.toNumber(params.project_id)

const { data: plan_page } = line.request(q.test.plans.Page(), (req, it) => {
  req.interpolations.project_id = project_id
  req.query = { ...utils.plainToQuery(query), q: search }
  return it.useQuery(req.toQueryConfig())
})
const { data: member_boxes } = line.request(q.project.members.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: test_case_stats } = line.request(q.case.test_case_stats.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

function onSearchInput() {
  setTimeout(() => {
    former.perform()
  }, 0);
}

function onCreated() {
  router.go(0)
}
</script>
