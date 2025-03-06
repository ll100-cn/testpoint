<template>
  <Card>
    <CardHeader>
      <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()" size="sm">
        <FormGroup path="platform_id" label="平台">
          <controls.Selectpicker include-blank="任意">
            <SelectdropItem v-for="platform in _platforms" :value="platform.id">
              <span class="fas fa-circle me-2 small" :style="{ color: utils.calcColorHex(platform.name) }" />
              {{ platform.name }}
            </SelectdropItem>

            <template #menuAfter>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem as-child>
                <router-link target="_blank" :to="`/projects/${project_id}/platforms`">平台列表</router-link>
              </DropdownMenuItem>
            </template>
          </controls.Selectpicker>
        </FormGroup>

        <FormGroup path="label_id" label="标签">
          <controls.Selectpicker include-blank="任意">
            <SelectdropItem v-for="label in _labels" :value="label.id">
              {{ label.name }}
            </SelectdropItem>

            <template #menuAfter>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem as-child>
                <router-link target="_blank" :to="`/projects/${project_id}/test_case_labels`">标签列表</router-link>
              </DropdownMenuItem>
            </template>
          </controls.Selectpicker>
        </FormGroup>

        <FormGroup path="group_name_search" label="分组">
          <controls.string />
        </FormGroup>

        <FormGroup path="relate_state" label="关联需求">
          <controls.Selectpicker include_blank>
            <SelectdropItem v-for="state in Object.keys(TEST_CASE_RELATE_STATES)" :value="state">
              {{ TEST_CASE_RELATE_STATES[state] }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>
      </Form>

      <template #actions>
        <Button size="sm" v-if="!readonly && allow('create', TestCase)" @click.prevent="showModal(project_id)">新增用例</Button>
      </template>
    </CardHeader>

    <CardBody
      :test_cases="search_test_cases"
      :newest_roadmap="newest_roadmap"
      :platform_repo="platform_repo"
      :label_repo="label_repo"
      :filter="filter"
      :readonly="readonly"
      @modal="(...args) => case_dialog!.show(...args)"
      @batch="(...args) => case_batch_dialog!.show(...args)" />

    <CardNewDialog ref="modal" :newest_roadmap="newest_roadmap" :platform_repo="platform_repo" :label_repo="label_repo" @create="onTestCaseCreated" />
  </Card>

  <teleport to="body">
    <BlankDialog ref="case_dialog" :readonly="readonly" :newest_roadmap="newest_roadmap" :platform_repo="platform_repo" :label_repo="label_repo" @updated="onTestCaseUpdated" @destroyed="onTestCaseDestroyed"></BlankDialog>
    <BlankDialog ref="case_batch_dialog" :platform_repo="platform_repo" :label_repo="label_repo" @updated="onBatchUpdated"></BlankDialog>
  </teleport>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import * as t from '@/lib/transforms'
import * as utils from '@/lib/utils'
import { EntityRepo, Milestone, Platform, TestCase, TestCaseLabel } from '@/models'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, getCurrentInstance, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type ChangeFilterFunction, Filter } from '../types'
import CardBody from './CardBody.vue'
import { usePageStore } from '@/store'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '@/ui'
import BlankDialog from '@/ui/BlankDialog.vue'
import CardNewDialog from './CardNewDialog.vue'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui'
import { TEST_CASE_RELATE_STATES } from '@/constants'

const proxy = getCurrentInstance()!.proxy as any
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const allow = page.inProject()!.allow

const case_dialog = ref<InstanceType<typeof BlankDialog>>()
const case_batch_dialog = ref<InstanceType<typeof BlankDialog>>()

class Search {
  @t.String group_name_search?: string = undefined
  @t.Number platform_id?: number | null = null
  @t.Number label_id?: number | null = null
  @t.String relate_state?: keyof typeof TEST_CASE_RELATE_STATES = undefined
}

const search = ref(plainToClass(Search, query))
const filter = plainToClass(Filter, query.f ?? {})

const former = Former.build(search.value)

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const data = utils.compactObject(this.form)
  router.push({ query: utils.plainToQuery(data) })
}

watch(computed(() => [ former.form.platform_id, former.form.label_id, former.form.relate_state ]), () => {
  former.perform()
})

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void
}>()

const milestone = ref(null as Milestone | null)
if (route.query.milestone_id) {
  const _milestones = await page.inProject()!.request(q.project.milestones.List).setup(proxy).perform()
  milestone.value = _.find(_milestones, { id: _.toNumber(route.query.milestone_id) }) ?? null
}
const readonly = computed(() => milestone.value != null)

const project_id = _.toNumber(params.project_id)
const test_cases = await new q.case.test_cases.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query.milestone_id = route.query.milestone_id
}).perform()

const _labels = ref(await new q.project.test_case_labels.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const label_repo = computed(() => {
  return new EntityRepo<TestCaseLabel>().setup(_labels.value)
})

const _platforms = ref(await new q.project.platforms.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const platform_repo = computed(() => {
  return new EntityRepo<Platform>().setup(_platforms.value)
})

const _roadmaps = ref(await new q.project.roadmaps.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const newest_roadmap = computed(() => {
  const newest = _roadmaps.value.sort((a, b) => b.id - a.id)[0]

  if (milestone.value) {
    return _roadmaps.value.filter((it) => it.created_at < milestone.value!.published_at).sort((a, b) => b.id - a.id)[0] ?? newest
  } else {
    return newest
  }
})

const search_test_cases = computed(() => {
  let scope = _(test_cases)

  const platform = platform_repo.value.find(_.toNumber(query.platform_id))
  if (platform) {
    scope = scope.filter(it => it.platform_ids.includes(platform.id))
  }

  const label = label_repo.value.find(_.toNumber(query.label_id))
  if (label) {
    scope = scope.filter(it => it.label_ids.includes(label.id))
  }

  if (query.group_name_search) {
    scope = scope.filter((it) => it.group_name?.includes(query.group_name_search))
  }

  if (query.relate_state) {
    if (query.relate_state === 'related') {
      scope = scope.filter((it) => it.requirement_id != null)
    } else if (query.relate_state === 'unrelated') {
      scope = scope.filter((it) => it.requirement_id == null)
    } else if (query.relate_state === 'expired') {
      scope = scope.filter((it) => (it.requirement_id != null && it.roadmap_id != newest_roadmap.value.id))
    }
  }

  return scope.value()
})

const changeFilter: ChangeFilterFunction = (overrides) => {
  const data = utils.compactObject({ ...query, f: { ...filter, ...overrides } })
  router.push({ query: utils.plainToQuery(data) })
}

provide("changeFilter", changeFilter)

const modal = ref<InstanceType<typeof CardNewDialog>>()
function showModal(project_id: number) {
  modal.value.show(project_id.toString())
}

function onTestCaseSend(test_case: TestCase) {
  console.log('onTestCaseSend', test_case)
}

function onTestCaseUpdated(test_case: TestCase) {
  router.go(0)
}

function onTestCaseDestroyed(test_case: TestCase) {
  router.go(0)
}

function onBatchUpdated() {
  router.go(0)
}

function onTestCaseCreated(test_case: TestCase) {
  router.go(0)
}

</script>
