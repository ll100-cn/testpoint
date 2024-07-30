<template>
  <Card>
    <CardHeader>
      <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform()" size="sm">
        <FormGroup path="platform_id" label="平台">
          <controls.dropdown #default="{ Component }">
            <component v-for="platform in _platforms" :is="Component" :value="platform.id">
              <span class="fas fa-circle me-2 small" :style="{ color: utils.calcColorHex(platform.name) }" />
              {{ platform.name }}
            </component>
            <div class="dropdown-divider" />
            <router-link class="dropdown-item" target="_blank" :to="`/projects/${project_id}/platforms`">平台列表</router-link>
          </controls.dropdown>
        </FormGroup>

        <FormGroup path="label_id" label="标签">
          <controls.dropdown #default="{ Component }">
            <component v-for="label in _labels" :is="Component" :value="label.id">{{ label.name }}</component>
            <div class="dropdown-divider" />
            <router-link class="dropdown-item" target="_blank" :to="`/projects/${project_id}/test_case_labels`">标签列表</router-link>
          </controls.dropdown>
        </FormGroup>

        <FormGroup path="group_name_search" label="分组">
          <controls.string />
        </FormGroup>
      </Form>

      <template #actions>
        <a v-if="allow('create', TestCase)" class="btn btn-primary btn-sm" href="#" @click="showModal(project_id)">新增用例</a>
      </template>
    </CardHeader>

    <CardBody
      :test_cases="search_test_cases"
      :platform_repo="platform_repo"
      :label_repo="label_repo"
      :filter="filter"
      @modal="(...args) => case_dialog.show(...args)"
      @batch="(...args) => case_batch_dialog.show(...args)" />

    <CardNewDialog ref="modal" :platform_repo="platform_repo" :label_repo="label_repo" @create="onTestCaseCreated" />
  </Card>

  <teleport to="body">
    <BlankDialog ref="case_dialog" :platform_repo="platform_repo" :label_repo="label_repo" @updated="onTestCaseUpdated" @destroyed="onTestCaseDestroyed"></BlankDialog>
    <BlankDialog ref="case_batch_dialog" :platform_repo="platform_repo" :label_repo="label_repo" @updated="onBatchUpdated"></BlankDialog>
  </teleport>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import * as t from '@/lib/transforms'
import * as utils from '@/lib/utils'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, getCurrentInstance, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChangeFilterFunction, Filter } from '../types'
import CardBody from './CardBody.vue'
import { usePageStore } from '@/store'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'
import BlankDialog from '$vendor/ui/BlankDialog.vue'
import CardNewDialog from './CardNewDialog.vue'
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as controls from '@/components/controls'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const allow = page.inProject().allow

const case_dialog = ref<InstanceType<typeof BlankDialog>>()
const case_batch_dialog = ref<InstanceType<typeof BlankDialog>>()

class Search {
  @t.String group_name_search?: string = undefined
  @t.Number platform_id?: number = undefined
  @t.Number label_id?: number = undefined
}

const search = ref(plainToClass(Search, query))
const filter = plainToClass(Filter, query.f ?? {})

const former = Former.build(search.value)

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const data = utils.compactObject(this.form)
  router.push({ query: utils.plainToQuery(data) })
}

watch(computed(() => [ former.form.platform_id, former.form.label_id ]), () => {
  former.perform()
})

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void
}>()

const project_id = _.toNumber(params.project_id)
const test_cases = await new q.case.TestCaseReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query.milestone_id = route.query.milestone_id
}).perform()

const _labels = ref(await new q.project.TestCaseLabelReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const label_repo = computed(() => {
  return new EntityRepo<TestCaseLabel>().setup(_labels.value)
})

const _platforms = ref(await new q.project.PlatformReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const platform_repo = computed(() => {
  return new EntityRepo<Platform>().setup(_platforms.value)
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
