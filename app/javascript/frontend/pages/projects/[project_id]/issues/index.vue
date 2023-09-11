<template>
  <div class="page-header">
    <h2>问题列表（{{ project.name }}）</h2>
    <div class="actions ms-auto">
      <form @submit="querySearch({ keyword: search.keyword, filter: 'all' })">
        <div class="input-group ms-auto">
          <input v-model="search.keyword" type="text" class="form-control" placeholder="搜索问题或评论">
          <button class="btn btn-primary" type="submit">搜索</button>
        </div>
      </form>
    </div>
    <button class="btn btn-primary ms-3" @click="utils.redirect(`projects/${project_id}/issues/new`)">新增问题</button>
  </div>

  <ul class="nav nav-tabs border-bottom-0 zindex-999 position-relative">
    <li v-for="option in filter_states_options" :key="option.name" class="nav-item">
      <button
        class="nav-link"
        :class="{ 'active': current_issue_state == option.value }"
        @click="router.push({ query: { filter: option.value } })">
        {{ option.name }} ({{ issue_stats_count[option.value] }})
      </button>
    </li>
  </ul>

  <div class="card rounded-top-left-0 card-x-table">
    <div class="card-body">
      <SearchBar :summary="issue_summary" />
      <table class="table">
        <colgroup>
          <col width="5%">
          <col width="20%">
          <col width="10%">
          <col width="8%">
          <col width="10%">
          <col width="10%">
          <col width="10%">
        </colgroup>
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
            <td><a href="" @click.prevent="utils.redirect(`/projects/${project.id}/issues/${issue.id}`)">{{ issue.title }}</a></td>
            <td><span class="badge" :style="`background-color: ${issue.category?.color}`">{{ issue.category?.name }}</span></td>
            <td><IssueStateBadge :issue_state="issue.state" /></td>
            <td>{{ issue.milestone?.title }}</td>
            <td>{{ issue.creator?.name }}</td>
            <td>{{ issue.assignee?.name }}</td>
            <!-- <% if @task %>
            <td>
              <%= render "relate_issue", project: @project, plan: @task.plan, task: @task, issue: issue %>
            </td>
            <% end %> -->
          </tr>
        </tbody>
      </table>
      <PaginationBar2 class="mb-0 mt-2" :pagination="issues" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, computed, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

import _ from "lodash"
import * as requests from "@/requests"
import * as utils from "@/lib/utils"
import Page from "@/pages/Page"
import Search from "./Search"

import IssueStateBadge from "@/components/IssueStateBadge.vue"
import PaginationBar2 from "@/components/PaginationBar2.vue"
import SearchBar from "./SearchBar.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)
const params = route.params as any

const page = utils.instance(Page, query)
const search = reactive(utils.instance(Search, query))

const project_id = params.project_id
const filter_states_options = ref([
  { name: "全部", value: "all", },
  { name: "分配", value: "assign", conds: [{ state: "pending" }, { state: "waiting" }, { state: "confirmed", assignee_id_is: false }] },
  { name: "开发", value: "develop", conds: [{ state: "confirmed", assignee_id_is: true }, { state: "processing" }] },
  { name: "测试", value: "test", conds: [{ state: "processed" }] },
  { name: "部署", value: "deploy", conds: [{ state: "deploying" }] },
  { name: "解决", value: "resolve", conds: [{ state: "resolved", archived_at_is: false }] },
  { name: "已关闭", value: "closed", conds: [{ state: "closed", archived_at_is: false }] },
  { name: "归档", value: "archive", conds: [{ archived_at_is: true }] },
])
const current_issue_state = ref(search.filter ?? "assign")

const project = ref(await new requests.ProjectShow().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const issues = ref(await new requests.IssuePaginationList().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...page, ...search })
}).perform())

const issue_summary = ref(await new requests.IssueSummaryGet().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...search })
}).perform())

const issue_stats = ref(await new requests.IssueStats().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
}).perform())

const issue_stats_count = computed(() => {
  const result = _.reduce(filter_states_options.value, (result: any, value) => {
    const conds = value.conds || []
    const current_stats_count = _.sumBy(_.filter(issue_stats.value, (it) => cond_match(it, conds)), "count")
    return { ...result, [value.value]: current_stats_count }
  }, {})
  result.all = _.sumBy(issue_stats.value, "count")
  return result
})

function cond_match(data, conds) {
  for (const cond of conds) {
    if (_.some([ data ], cond)) {
      return true
    }
  }
  return false
}

function querySearch(search: Search | null) {
  if (search) {
    const data = utils.compactObject(search)
    router.push({ query: utils.plainToQuery(data) })
  } else {
    router.push({ query: null })
  }
}

</script>