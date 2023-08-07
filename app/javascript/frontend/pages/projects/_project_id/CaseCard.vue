<template>
  <div class="card app-card-main">
    <div class="card-header bg-white d-flex">
      <h5 class="my-auto mx-2">平台</h5>

      <div class="dropdown">
        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
          {{ current_platform?.name ?? "全部" }}
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#" :class="{ 'active': !current_platform }" @click="changeFilter({ ...reset_search, platform_id: null })">全部</a>
          <template v-for="platform in platform_repo.values()" :key="platform.id">
            <a class="dropdown-item " href="#" :class="{ 'active': platform.id === current_platform?.id }" @click="changeFilter({ ...reset_search, platform_id: platform.id.toString() })">{{ platform.name }}</a>
          </template>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/platforms?ok_url=%2Fprojects%2F1%2Ftest_cases" href="#">平台列表</a>
        </div>
      </div>


      <h5 class="my-auto mx-2">标签</h5>

      <div class="dropdown">
        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
          {{ current_label?.name ?? "全部" }}
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#" :class="{ 'active': !current_label }" @click="changeFilter({ ...reset_search, label_id: null })">全部</a>
          <template v-for="label in lable_repo.values()" :key="label.id">
            <a class="dropdown-item " href="#" :class="{ 'active': label.id === current_label?.id }" @click="changeFilter({ ...reset_search, label_id: label.id.toString() })">{{ label.name }}</a>
          </template>

          <div class="dropdown-divider"></div>
          <a class="dropdown-item" data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_case_labels?ok_url=%2Fprojects%2F1%2Ftest_cases" href="#">标签列表</a>
        </div>
      </div>


      <div class="actions ms-auto">

      </div>
    </div>

    <CardBody :test_cases="search_test_cases" :platform_repo="platform_repo" :label_repo="lable_repo" :filter="filter" @change="onTestCaseChanged" @batch_change="onBatchChanged" />
  </div>
</template>


<script setup lang="ts">
import { ChangeFilterFunction, Filter } from './types'
import CardBody from './CardBody.vue'
import { useRoute, useRouter } from 'vue-router'
import { EntityRepo, Platform, TestCase, TestCaseLabel } from '@/models'
import * as requests from '@/requests'
import qs from "qs"
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, getCurrentInstance, provide, ref } from 'vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()

const querystring = qs.stringify(route.query, { arrayFormat: "brackets" })
const query = qs.parse(querystring, { ignoreQueryPrefix: true })
const filter = plainToClass(Filter, query.f ?? {}) as Filter
const reset_search = {
  role_name: null,
  archived: null,
  scene_path: null
}

const emit = defineEmits<{
  (e: 'change', test_case: TestCase): void
}>()

const project_id = _.toNumber(route.params.project_id)
const test_cases = await new requests.TestCaseListRequest().setup(req => {
  req.interpolations.project_id = project_id
}).perform(proxy)

const _labels = ref(await new requests.TestCaseLabelListRequest().setup(req => {
  req.interpolations.project_id = project_id
}).perform(proxy))

const lable_repo = computed(() => {
  return new EntityRepo<TestCaseLabel>(_labels.value)
})

const _platforms = ref(await new requests.PlatformListRequest().setup(req => {
  req.interpolations.project_id = project_id
}).perform(proxy))

const platform_repo = computed(() => {
  return new EntityRepo<Platform>(_platforms.value)
})

const current_platform = platform_repo.value.find(_.toNumber(filter.platform_id))
const current_label = lable_repo.value.find(_.toNumber(filter.label_id))

const search_test_cases = computed(() => {
  let scope = _(test_cases)
  if (!_.isEmpty(filter.platform_id)) {
    scope = scope.filter(it => it.platform_ids.includes(_.toNumber(filter.platform_id)))
  }
  if (!_.isEmpty(filter.label_id)) {
    scope = scope.filter(it => it.label_ids.includes(_.toNumber(filter.label_id)))
  }
  return scope.value()
})

const changeFilter: ChangeFilterFunction = (overrides) => {
  query["f"] = _({}).assign(filter).assign(overrides).omitBy(_.isNil).value()

  const queryString = qs.stringify(query, { arrayFormat: "brackets" })
  router.push({ query: qs.parse(queryString, { depth: 0 }) as any })
}

provide("changeFilter", changeFilter)

function onTestCaseChanged(test_case: TestCase) {
  router.go(0)
}

function onBatchChanged() {
  router.go(0)
}

</script>