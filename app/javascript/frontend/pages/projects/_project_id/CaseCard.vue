<template>
  <div class="card app-card-main">
    <div class="card-header bg-white d-flex">
      <h5 class="my-auto mx-2">平台</h5>

      <div class="dropdown">
        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
          全部
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item active" href="/projects/1/test_cases">全部</a>
            <a class="dropdown-item " href="/projects/1/test_cases?platform_id=3">Web</a>
            <a class="dropdown-item " href="/projects/1/test_cases?platform_id=9">微信公众号</a>
            <a class="dropdown-item " href="/projects/1/test_cases?platform_id=2">Android</a>
            <a class="dropdown-item " href="/projects/1/test_cases?platform_id=1">iOS</a>
            <a class="dropdown-item " href="/projects/1/test_cases?platform_id=12">教师机房版</a>
            <a class="dropdown-item " href="/projects/1/test_cases?platform_id=13">test</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/platforms?ok_url=%2Fprojects%2F1%2Ftest_cases" href="#">平台列表</a>
        </div>
      </div>


      <h5 class="my-auto mx-2">标签</h5>

      <div class="dropdown">
        <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
          全部
        </button>
        <div class="dropdown-menu">

          <a class="dropdown-item active" href="/projects/1/test_cases?q%5Blabels_id_eq%5D=">全部</a>

            <a class="dropdown-item " href="/projects/1/test_cases?q%5Blabels_id_eq%5D=1">
              会员
      </a>      <div class="dropdown-divider"></div>
          <a class="dropdown-item" data-remote="true" data-bs-toggle="modal" data-bs-target="#applicationModal" data-url="/projects/1/test_case_labels?ok_url=%2Fprojects%2F1%2Ftest_cases" href="#">标签列表</a>
        </div>
      </div>


      <div class="actions ms-auto">

      </div>
    </div>

    <div class="card-body d-flex">
      <div class="col-12 col-md-4 col-xl-3 border-end py-3">
        <FolderSide :test_cases="test_cases" :filter="filter" />
      </div>

      <div class="col">
        <CaseTable :test_cases="avaiable_test_cases" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import FolderSide from './FolderSide.vue'
import { ChangeFilterFunction, Filter } from './types'
import CaseTable from './CaseTable.vue'
import { useRoute, useRouter } from 'vue-router'
import { TestCase } from '@/models'
import qs from "qs"
import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { computed, provide } from 'vue'

const route = useRoute()
const router = useRouter()
const props = defineProps({
  test_cases: {
    type: Array<TestCase>,
    required: true
  },
  project_id: {
    type: Number,
    required: true
  }
})

const querystring = qs.stringify(route.query, { arrayFormat: "brackets" })
const query = qs.parse(querystring, { ignoreQueryPrefix: true })
const filter = plainToClass(Filter, query.f ?? {}) as Filter

console.log(filter)
console.log(typeof filter)

const avaiable_test_cases = computed(() => {
  let scope = _(props.test_cases)
  if (filter.role_name) {
    scope = scope.filter(it => it.role_name === (filter.role_name === "" ? null : filter.role_name))
  }
  if (filter.scene_path) {
    scope = scope.filter(it => _.startsWith(it.scene_name, filter.scene_path))
  }
  if (filter.archived) {
    scope = scope.filter(it => it.archived === (filter.archived === "1" ? true : false))
  }
  return scope.value()
})

const changeFilter: ChangeFilterFunction = (overrides) => {
  Object.assign(filter, overrides)
  query["f"] = filter

  const queryString = qs.stringify(query, { arrayFormat: "brackets" })
  router.push({ query: qs.parse(queryString, { depth: 0 }) as any })
}

provide("changeFilter", changeFilter)

</script>