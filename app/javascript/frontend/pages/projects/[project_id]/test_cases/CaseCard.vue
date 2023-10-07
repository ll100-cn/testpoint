<template>
  <div class="card page-card">
    <div class="card-header bg-white d-flex">
      <layouts.form_inline v-bind="{ former }" @submit.prevent="former.submit" :default_wrapper_config="{ size: 'small' }">
        <layouts.group code="platform_id" label="平台">
          <controls.dropdown #default="{ Component }">
            <component v-for="platform in _platforms" :is="Component" :value="platform.id">
              <span class="fas fa-circle me-2 small" :style="{ color: utils.calcColorHex(platform.name) }" />
              {{ platform.name }}
            </component>
            <div class="dropdown-divider" />
            <router-link class="dropdown-item" target="_blank" :to="`/projects/${project_id}/platforms`">平台列表</router-link>
          </controls.dropdown>
        </layouts.group>

        <layouts.group code="label_id" label="标签">
          <controls.dropdown #default="{ Component }">
            <component v-for="label in _labels" :is="Component" :value="label.id">{{ label.name }}</component>
            <div class="dropdown-divider" />
            <router-link class="dropdown-item" target="_blank" :to="`/projects/${project_id}/test_case_labels`">标签列表</router-link>
          </controls.dropdown>
        </layouts.group>

        <layouts.group code="group_name_search" label="分组">
          <controls.string />
        </layouts.group>
      </layouts.form_inline>

      <div class="d-flex ms-auto x-spacer-3 align-items-center">
        <a v-if="allow('create', TestCase)" class="btn btn-primary btn-sm" href="#" @click="showModal(project_id)">新增用例</a>
      </div>
    </div>

    <CardBody
      :test_cases="search_test_cases"
      :platform_repo="platform_repo"
      :label_repo="label_repo"
      :filter="filter"
      @modal="(...args) => case_modal.show(...args)"
      @batch="(...args) => case_batch_modal.show(...args)" />

    <CardNew ref="modal" :platform_repo="platform_repo" :label_repo="label_repo" @create="onTestCaseCreated" />
  </div>

  <teleport to="body">
    <BlankModal ref="case_modal" :platform_repo="platform_repo" :label_repo="label_repo" @updated="onTestCaseUpdated" @destroyed="onTestCaseDestroyed"></BlankModal>
    <BlankModal ref="case_batch_modal" :platform_repo="platform_repo" :label_repo="label_repo" @updated="onBatchUpdated"></BlankModal>
  </teleport>
</template>

<script setup lang="ts">
import { controls, layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
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
import CardNew from './CardNew.vue'
import { usePageStore } from '@/store'
import BlankModal from '@/components/BlankModal.vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const params = route.params as any
const query = utils.queryToPlain(route.query)
const page = usePageStore()
const allow = page.inProject().allow
const case_modal = ref<InstanceType<typeof BlankModal>>()
const case_batch_modal = ref<InstanceType<typeof BlankModal>>()

class Search {
  @t.String group_name_search?: string = undefined
  @t.Number platform_id?: number = undefined
  @t.Number label_id?: number = undefined
}

const search = ref(plainToClass(Search, query))
const filter = plainToClass(Filter, query.f ?? {})

const former = Former.build(search.value)
former.perform = async function() {
  const data = utils.compactObject(this.form)
  router.push({ query: utils.plainToQuery(data) })
}

watch(computed(() => [ former.form.platform_id, former.form.label_id ]), former.submit)

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

const modal = ref<InstanceType<typeof CardNew>>()
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
