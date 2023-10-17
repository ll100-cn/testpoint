<template>
  <div class="page-header">
    <h2>问题列表</h2>

    <div class="d-flex ms-auto x-spacer-4 align-items-center">
      <layouts.form_inline v-bind="{ former }" @submit.prevent="former.submit(former.form)">
        <layouts.group code="keyword">
          <controls.string placeholder="搜索问题或评论" />
        </layouts.group>

        <layouts.submit class="w-auto">搜索</layouts.submit>
      </layouts.form_inline>

      <router-link v-if="allow('create', Issue)" class="btn btn-primary" :to="`/projects/${project_id}/issues/new`">新增问题</router-link>
    </div>
  </div>

  <div class="nav nav-tabs mb-n1px position-relative zindex-999">
    <router-link class="nav-link" :class="{ 'active': search2.stage === 'all' }" :to="{ query: utils.plainToQuery({ ...search2, stage: 'all' }, true) }">
      全部 ({{ _(issue_stage_count).values().sum() }})
    </router-link>
    <template v-for="(name, code) in ENUM_ISSUE_STAGES">
      <router-link class="nav-link" :class="{ 'active': search2.stage === code }" :to="{ query: utils.plainToQuery({ ...search2, stage: code }, true) }">
        {{ name }} ({{ issue_stage_count[code] ?? 0 }})
      </router-link>
    </template>
  </div>

  <div class="card rounded-top-left-0 card-x-table">
    <div class="card-body">
      <FilterBar :summary="issue_summary" />
      <table class="table">
        <thead>
          <tr>
            <th><SortLink :sorts="search2.sorts" code="id" @click.prevent="sork_link('id')">ID</SortLink></th>
            <th>标题</th>
            <th>分类</th>
            <th><SortLink :sorts="search2.sorts" code="state" @click.prevent="sork_link('state')">状态</SortLink></th>
            <th>里程碑</th>
            <th>创建人</th>
            <th>受理人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="issue in issues.list" :key="issue.id" :class="{ 'block-discard': issue.state == 'closed' }">
            <td>{{ issue.id }}</td>
            <td><router-link :to="`/projects/${project_id}/issues/${issue.id}`">{{ issue.title }}</router-link></td>
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
import CategoryBadge from "@/components/CategoryBadge.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import PaginationBar from "@/components/PaginationBar.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import Page from "@/pages/Page"
import _ from "lodash"
import { computed, getCurrentInstance, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import FilterBar from "./FilterBar.vue"
import { Filter2, Search2 } from "./types"
import { ENUM_ISSUE_STAGES } from "@/constants"
import { usePageStore } from "@/store"
import { Issue } from "@/models"
import SortLink from "./SortLink.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)
const params = route.params as any
const page = usePageStore()
const allow = page.inProject().allow

const page2 = utils.instance(Page, query)
const search2 = reactive(utils.instance(Search2, query))
const filter2 = reactive(utils.instance(Filter2, query))

const project_id = params.project_id

const former = Former.build(search2)
former.perform = async function(search: Search2 | null) {
  if (search) {
    const data = utils.compactObject(search)
    router.push({ query: utils.plainToQuery(data) })
  } else {
    router.push({ query: null })
  }
}

function sork_link(code: string) {
  const sort_data = search2.sorts?.split(" ") ?? []
  if (sort_data[0] == code) {
    search2.sorts = `${code} ${sort_data[1] == "asc" ? "desc" : "asc"}`
  } else {
    search2.sorts = `${code} asc`
  }

  const data = utils.compactObject({ ...search2, ...filter2 })
  router.push({ query: utils.plainToQuery(data) })
}

const issues = ref(await new q.bug.IssueReq.Page().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...search2, ...filter2, ...page2 })
}).perform())

const issue_summary = ref(await new q.bug.IssueSummaryReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...search2, ...filter2 })
}).perform())

const issue_stats = ref(await new q.bug.IssueStatReq.List().setup(proxy, (req) => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ keyword: search2.keyword })
}).perform())

const issue_stage_count = computed(() => {
  return _(issue_stats.value).groupBy("stage").mapValues(stats => _.sumBy(stats, it => it.count)).value()
})
</script>
