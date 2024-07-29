<template>
  <PageHeader>
    <PageTitle>问题列表</PageTitle>

    <template #actions>
      <layouts.form_inline v-bind="{ former }" @submit.prevent="former.submit(former.form)" class="mx-0">
        <layouts.group code="keyword">
          <controls.string placeholder="搜索问题或评论" />
        </layouts.group>

        <layouts.submit class="w-auto">搜索</layouts.submit>
      </layouts.form_inline>

      <router-link v-if="allow('create', Issue)" class="btn btn-primary" :to="`/projects/${project_id}/issues/new`">新增问题</router-link>
    </template>
  </PageHeader>

  <Nav :model-value="search2.stage">
    <NavList preset="tabs" class="inline-flex">
      <NavItem value="all" as-child>
        <router-link :to="{ query: utils.plainToQuery({ ...search2, stage: 'all' }, true) }">
          全部 ({{ _(issue_stage_count).values().sum() }})
        </router-link>
      </NavItem>
      <NavItem v-for="(name, code) in ENUM_ISSUE_STAGES" :value="code" as-child>
        <router-link :to="{ query: utils.plainToQuery({ ...search2, stage: code }, true) }">
          {{ name }} ({{ issue_stage_count[code] ?? 0 }})
        </router-link>
      </NavItem>
    </NavList>
  </Nav>

  <Card class="rounded-ss-none">
    <CardHeader class="bg-transparent">
      <FilterBar :summary="issue_summary" />
    </CardHeader>

    <CardContent class="!py-0">
      <IssueList :issues="pagination.list" :sorts="search2.sorts" />
    </CardContent>

    <CardFooter>
      <PaginationBar :pagination="pagination" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, Nav, NavItem, NavList } from '$vendor/ui'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import PaginationBar from "@/components/PaginationBar.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import { ENUM_ISSUE_STAGES } from "@/constants"
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { Issue } from "@/models"
import Page from "@/pages/Page"
import { usePageStore } from "@/store"
import _ from "lodash"
import { computed, getCurrentInstance, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import FilterBar from "./FilterBar.vue"
import IssueList from "./IssueList.vue"
import { Filter2, Search2 } from "./types"

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
search2.sorts ??= "id desc"
former.perform = async function(search: Search2 | null) {
  if (search) {
    const data = utils.compactObject(search)
    router.push({ query: utils.plainToQuery(data) })
  } else {
    router.push({ query: null })
  }
}

const pagination = ref(await new q.bug.IssueReq.Page().setup(proxy, (req) => {
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
