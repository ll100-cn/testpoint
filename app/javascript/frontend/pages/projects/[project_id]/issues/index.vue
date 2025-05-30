<template>
  <PageHeader>
    <PageTitle>问题列表</PageTitle>

    <template #actions>
      <Form preset="inline" v-bind="{ former }" @submit.prevent="former.perform(former.form)" class="mx-0">
        <FormGroup path="keyword" label="">
          <controls.String placeholder="搜索问题或评论" />
        </FormGroup>

        <Button class="w-auto">搜索</Button>
      </Form>

      <Button v-if="allow('create', Issue)" :to="`/projects/${project_id}/issues/new`">新增问题</Button>
    </template>
  </PageHeader>

  <Nav preset="tabs" class="inline-flex peer after:inset-x-2">
    <NavItem value="all" as-child>
      <RLink :to="{ query: utils.plainToQuery({ ...search2, stage: 'all' }, true) }" active-by="query" active-column="stage">
        全部 ({{ _(issue_stage_count).values().sum() }})
      </RLink>
    </NavItem>
    <NavItem v-for="(name, code) in ENUM_ISSUE_STAGES" :value="code" as-child>
      <RLink :to="{ query: utils.plainToQuery({ ...search2, stage: code }, true) }" active-by="query" active-column="stage">
        {{ name }} ({{ issue_stage_count[code] ?? 0 }})
      </RLink>
    </NavItem>
  </Nav>

  <Card class="peer-has-[*:first-child[data-state=active]]:rounded-ss-none peer-has-[*:first-child:hover]:rounded-ss-none">
    <CardHeader class="bg-transparent">
      <FilterBar :summary="issue_summary" />
    </CardHeader>

    <CardTable>
      <IssueList :issues="pagination.list" :sorts="search2.sorts" />
    </CardTable>

    <CardFooter>
      <PaginationBar :pagination="pagination" />
    </CardFooter>
  </Card>

</template>

<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, CardTable } from '$ui/card'
import { Nav, NavItem } from '$ui/nav'
import useRequestList from '@/lib/useRequestList'
import PageHeader from "@/components/PageHeader.vue"
import PageTitle from "@/components/PageTitle.vue"
import PaginationBar from "@/components/PaginationBar.vue"
import { ENUM_ISSUE_STAGES } from "@/constants"
import * as q from '@/requests'
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
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import RLink from '@/components/RLink.vue'

const reqs = useRequestList()
const route = useRoute()
const router = useRouter()
const query = utils.queryToPlain(route.query)
const params = route.params as any
const page = usePageStore()
const allow = page.inProject()!.allow

const page2 = utils.instance(Page, query)
const search2 = reactive(utils.instance(Search2, query))
const filter2 = reactive(utils.instance(Filter2, query))

const project_id = params.project_id

const former = Former.build(search2)

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

search2.sorts ??= "id desc"
former.doPerform = async function(search: Search2 | null) {
  if (search) {
    const data = utils.compactObject(search)
    router.push({ query: utils.plainToQuery(data) })
  } else {
    router.push({})
  }
}

const pagination = reqs.add(q.bug.issues.Page).setup(req => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...search2, ...filter2, ...page2 })
}).wait()
const pagination2 = reqs.add(q.v2.bug.issues.page).setup(req => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...search2, ...filter2, ...page2 })
}).wait()
const issue_summary = reqs.add(q.bug.issue_summaries.Get).setup(req => {
  req.interpolations.project_id = project_id
  req.query = utils.compactObject({ ...search2, ...filter2 })
}).wait()
await reqs.performAll()

const issue_stage_count = computed(() => {
  return _(pagination2.value.issue_stats).groupBy("stage").mapValues(stats => _.sumBy(stats, it => it.count)).value()
})
</script>
