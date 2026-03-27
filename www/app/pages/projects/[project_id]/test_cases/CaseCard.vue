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
                <router-link target="_blank" :to="`${path_info.parent.resource}/${project_id}/platforms`">平台列表</router-link>
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
                <router-link target="_blank" :to="`${path_info.parent.resource}/${project_id}/test_case_labels`">标签列表</router-link>
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
              {{ TEST_CASE_RELATE_STATES[state as keyof typeof TEST_CASE_RELATE_STATES] }}
            </SelectdropItem>
          </controls.Selectpicker>
        </FormGroup>
      </Form>

      <template #actions>
        <Button size="sm" v-if="!readonly && allow('create', TestCase)" @click.prevent="showModal()">新增用例</Button>
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

    <CardNewDialog ref="modal" :newest_roadmap="newest_roadmap" :platform_repo="platform_repo" :label_repo="label_repo" @create="createTestCase" />
  </Card>

  <teleport to="body">
    <TestCaseDialog ref="case_dialog" :readonly="readonly" :newest_roadmap="newest_roadmap" :platform_repo="platform_repo" :label_repo="label_repo" @updated="updateTestCase" @destroyed="destroyTestCase"></TestCaseDialog>
    <TestCaseBatchDialog ref="case_batch_dialog" :platform_repo="platform_repo" :label_repo="label_repo" @updated="batchUpdated"></TestCaseBatchDialog>
  </teleport>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Card, CardHeader } from '$ui/card'
import { DropdownMenuItem, DropdownMenuSeparator } from '$ui/dropdown-menu'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import BlankDialog from '@/components/BlankDialog.vue'
import * as controls from '@/components/controls'
import { SelectdropItem } from '@/components/controls/selectdrop'
import type { TestCaseBatchFrameComponent } from '@/components/TestCaseBatchFrame'
import type { TestCaseFrameComponent } from '@/components/TestCaseFrame'
import { TEST_CASE_RELATE_STATES } from '@/constants'
import PathHelper from '@/lib/PathHelper'
import { useQueryLine } from '@/lib/useQueryLine'
import * as utils from '@/lib/utils'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import * as q from '@/requests'
import { NullableIntegerInputSchema } from '@/schemas/_shared'
import { usePageStore } from '@/store'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'
import { type ChangeFilterFunction, Filter } from '../types'
import CardBody from './CardBody.vue'
import CardNewDialog from './CardNewDialog.vue'

const line = useQueryLine()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query) as any
const page = usePageStore()
const allow = page.inProject()!.allow
const path_info = PathHelper.parseMember(route.path, 'show')

const TestCaseDialog = BlankDialog as typeof BlankDialog & TestCaseFrameComponent
const TestCaseBatchDialog = BlankDialog as typeof BlankDialog & TestCaseBatchFrameComponent
const case_dialog = ref<InstanceType<typeof BlankDialog & TestCaseFrameComponent>>()
const case_batch_dialog = ref<InstanceType<typeof BlankDialog & TestCaseBatchFrameComponent>>()

const SearchSchema = z.object({
  group_name_search: z.string().optional(),
  platform_id: NullableIntegerInputSchema.optional(),
  label_id: NullableIntegerInputSchema.optional(),
  relate_state: z.enum(['unrelated', 'related', 'expired']).optional(),
})

type Search = z.infer<typeof SearchSchema>

function parseSearch(raw: unknown): Search {
  return SearchSchema.parse(raw)
}

const search = parseSearch(query)
const filter = plainToClass(Filter, query.f ?? {})

const former = Former.build(search)

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const data = utils.compactObject(parseSearch(this.form))
  router.push({ query: utils.plainToQuery(data) })
}

watch(computed(() => [ former.form.platform_id, former.form.label_id, former.form.relate_state ]), () => {
  former.perform()
})

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void
}>()

const project_id = _.toNumber(params.project_id)

const { data: _milestone_boxes } = line.request(q.project.milestones.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery({
    ...req.toQueryConfig(),
    enabled: computed(() => !!query.milestone_id)
  })
})

const { data: test_case_page } = line.request(q.case.test_cases.List(), (req, it) => {
  req.interpolations.project_id = project_id
  req.query = { milestone_id: query.milestone_id }
  return it.useQuery(req.toQueryConfig())
})
const { data: _label_boxes } = line.request(q.project.test_case_labels.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: _platform_boxes } = line.request(q.project.platforms.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
const { data: _roadmap_boxes } = line.request(q.project.roadmaps.List(), (req, it) => {
  req.interpolations.project_id = project_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()

const test_cases = computed(() => test_case_page.value.list.map(it => it.test_case))
const _labels = computed(() => _label_boxes.value.map(it => it.test_case_label))
const _platforms = computed(() => _platform_boxes.value.map(it => it.platform))
const _roadmaps = computed(() => _roadmap_boxes.value.map(it => it.roadmap))
const milestone = computed(() => {
  if (_milestone_boxes.value) {
    return _milestone_boxes.value.find(it => it.milestone.id === _.toNumber(query.milestone_id))?.milestone
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

  const platform = platform_repo.value.find(_.toNumber(former.form.platform_id))
  if (platform) {
    scope = scope.filter(it => it.platform_ids.includes(platform.id))
  }

  const label = label_repo.value.find(_.toNumber(former.form.label_id))
  if (label) {
    scope = scope.filter(it => it.label_ids.includes(label.id))
  }

  if (former.form.group_name_search) {
    scope = scope.filter((it) => !!it.group_name?.includes(former.form.group_name_search))
  }

  if (former.form.relate_state) {
    if (former.form.relate_state === 'related') {
      scope = scope.filter((it) => it.requirement_id != null)
    } else if (former.form.relate_state === 'unrelated') {
      scope = scope.filter((it) => it.requirement_id == null)
    } else if (former.form.relate_state === 'expired') {
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
  console.log('showModal', modal.value)
  modal.value?.show(project_id.toString())
}

function updateTestCase(test_case: TestCase) {
}

function destroyTestCase(test_case: TestCase) {
}

function batchUpdated() {
}

function createTestCase(test_case: TestCase) {
}

</script>
