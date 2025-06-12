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
          <controls.String />
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
import * as q from '@/requests'
import * as t from '@/lib/transforms'
import * as utils from '@/lib/utils'
import { EntityRepo, Milestone, MilestoneBox, MilestonePage, Platform, TestCase, TestCaseLabel } from '@/models'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, getCurrentInstance, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type ChangeFilterFunction, Filter } from '../types'
import CardBody from './CardBody.vue'
import { usePageStore, useSessionStore } from '@/store'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import BlankDialog from '@/components/BlankDialog.vue'
import CardNewDialog from './CardNewDialog.vue'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$ui/dropdown-menu'
import { TEST_CASE_RELATE_STATES } from '@/constants'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query) as any
const page = usePageStore()
const allow = page.inProject()!.allow
const session = useSessionStore()

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

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

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

const _milestone_page = ref(null! as MilestonePage<MilestoneBox>)

const project_id = _.toNumber(params.project_id)

if (query.milestone_id) {
  const { data: milestone_page_temp } = line.request(q.project.milestones.List(), (req, it) => {
    req.interpolations.project_id = project_id
    return it.useQuery(req.toQueryConfig())
  })
  _milestone_page.value = milestone_page_temp.value
}
const { data: test_case_page } = line.request(q.case.test_cases.List(), (req, it) => {
  req.interpolations.project_id = project_id
  req.query = { milestone_id: query.milestone_id }
  return it.useQuery(req.toQueryConfig())
})
const { data: _label_page } = line.request(q.project.test_case_labels.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: _platform_page } = line.request(q.project.platforms.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: _roadmap_page } = line.request(q.project.roadmaps.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const test_cases = computed(() => test_case_page.value.list.map(it => it.test_case))
const _labels = computed(() => _label_page.value.list.map(it => it.test_case_label))
const _platforms = computed(() => _platform_page.value.list.map(it => it.platform))
const _roadmaps = computed(() => _roadmap_page.value.list.map(it => it.roadmap))
const milestone = computed(() => {
  if (_milestone_page.value) {
    return _milestone_page.value.list.find(it => it.milestone.id === _.toNumber(query.milestone_id))?.milestone
  }
})
const readonly = computed(() => milestone.value != null)
const label_repo = computed(() => {
  return new EntityRepo<TestCaseLabel>().setup(_labels.value)
})
const platform_repo = computed(() => {
  return new EntityRepo<Platform>().setup(_platforms.value)
})
const newest_roadmap = computed(() => {
  const newest = _roadmaps.value.sort((a, b) => b.id - a.id)[0]

  if (milestone.value) {
    return _roadmaps.value.filter((it) => (milestone!.value!.published_at != null && it.created_at < milestone!.value!.published_at)).sort((a, b) => b.id - a.id)[0] ?? newest
  } else {
    return newest
  }
})

const search_test_cases = computed(() => {
  let scope = _(test_cases.value)

  const platform = platform_repo.value.find(_.toNumber(query.platform_id))
  if (platform) {
    scope = scope.filter(it => it.platform_ids.includes(platform.id))
  }

  const label = label_repo.value.find(_.toNumber(query.label_id))
  if (label) {
    scope = scope.filter(it => it.label_ids.includes(label.id))
  }

  if (query.group_name_search) {
    scope = scope.filter((it) => !!it.group_name?.includes(query.group_name_search))
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
function showModal() {
  modal.value?.show(project_id.toString())
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
