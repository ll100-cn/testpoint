<template>
  <div class="page-header">
    <h2>问题列表（{{ project.name }}）</h2>

    <div class="d-flex ms-auto x-spacer-3 align-items-center">
      <form @submit="querySearch({ keyword: search.keyword })">
        <div class="input-group ms-auto">
          <input v-model="search.keyword" type="text" class="form-control" placeholder="搜索问题或评论">
          <button class="btn btn-primary" type="submit">搜索</button>
        </div>
      </form>

      <router-link class="btn btn-primary" :to="`/projects/${project_id}/issues/new`">新增问题</router-link>
    </div>
  </div>

  <ul class="nav nav-tabs border-bottom-0 zindex-999 position-relative">
    <button class="nav-link" :class="{ 'active': current_issue_stage === 'all' }" @click="router.push({ query: { stage: 'all' } })"> 全部 ({{ issue_stage_count['all'] }})
    </button>
    <li v-for="(name, code) in ENUM_ISSUE_STAGES" :key="code" class="nav-item">
      <button class="nav-link" :class="{ 'active': current_issue_stage == code }" @click="router.push({ query: { stage: code } })"> {{ name }} ({{ issue_stage_count[code] }})
      </button>
    </li>
  </ul>

  <div class="card rounded-top-left-0 card-x-table">
    <div class="card-body">
      <SearchBar :summary="issue_summary" />
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>分类</th>
            <th>状态</th>
            <th>里程碑</th>
            <th>创建人</th>
            <th>受理人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="issue in issues.list" :key="issue.id" :class="{ 'block-discard': issue.state == 'closed' }">
            <td>{{ issue.id }}</td>
            <td><router-link :to="`/projects/${project.id}/issues/${issue.id}`">{{ issue.title }}</router-link></td>
            <td><CategoryBadge :category="issue.category" /></td>
            <td><IssueStateBadge :state="issue.state" /></td>
            <td>{{ issue.milestone?.title }}</td>
            <td>{{ issue.creator?.name }}</td>
            <td>{{ issue.assignee?.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <PaginationBar :pagination="issues" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import * as utils from "@/lib/utils"
import Page from "@/pages/Page"
import * as requests from '@/lib/requests'
import _ from "lodash"
import Search from "./Search"

import CategoryBadge from "@/components/CategoryBadge.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import PaginationBar from "@/components/PaginationBar.vue"
import SearchBar from "./SearchBar.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)
const params = route.params as any

const page = utils.instance(Page, query)
const search = reactive(utils.instance(Search, query))

const project_id = params.project_id

const ENUM_ISSUE_STAGES = {
  pending: '分配',
  developing: '开发',
  testing: '测试',
  deploying: '部署',
  resolved: '解决',
  closed: '已关闭',
}
const current_issue_stage = ref(search.stage ?? "pending")

const project = ref(await new requests.ProjectReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const issues = ref(await new requests.ProjectIssueReq.Page().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...page, ...search })
}).perform())

const issue_summary = ref(await new requests.IssueSummaryReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...search })
}).perform())

const issue_stats = ref(await new requests.IssueStats().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const issue_stage_count = computed(() => {
  const result = _.reduce(ENUM_ISSUE_STAGES, (result: any, name, code) => {
    const current_stage_count = _.sumBy(_.filter(issue_stats.value, (it) => it.stage == code), "count")
    return { ...result, [ code ]: current_stage_count }
  }, {})
  result.all = _.sumBy(issue_stats.value, "count")
  return result
})

function querySearch(search: Search | null) {
  if (search) {
    const data = utils.compactObject(search)
    router.push({ query: utils.plainToQuery(data) })
  } else {
    router.push({ query: undefined })
  }
}

</script>
