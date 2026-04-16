<template>
  <PageHeader :issues_count="unhandled_issues_count" current="issues" />

  <Nav preset="tabs">
    <NavItem class="me-auto" as-child>
      <RLink :to="{ query: {} }" active-by="query" active-column="filter">
        待处理的
        <Badge variant="destructive" shape="pill" size="sm" class="ms-1">{{ unhandled_issues_count }}</Badge>
      </RLink>
    </NavItem>

    <NavItem as-child>
      <RLink :to="{ query: { filter: 'created' } }" active-by="query" active-column="filter">
        创建的
      </RLink>
    </NavItem>

    <NavItem as-child>
      <RLink :to="{ query: { filter: 'subscribed' } }" active-by="query" active-column="filter">
        关注的
      </RLink>
    </NavItem>

    <NavItem as-child>
      <RLink :to="{ query: { filter: 'assigned' } }" active-by="query" active-column="filter">
        受理的
      </RLink>
    </NavItem>

    <NavItem as-child>
      <RLink :to="{ query: { filter: 'archived' } }" active-by="query" active-column="filter">
        归档的
      </RLink>
    </NavItem>
  </Nav>

  <Card class="rounded-t-none">
    <CardTopState v-if="isLoading" />

    <CardTable>
      <IssueList :issue_boxes="pagination.list" :columns="['project']" :sorts="sorts" />
    </CardTable>
    <CardFooter>
      <PaginationBar :pagination="pagination" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import PaginationBar from "@/components/PaginationBar.vue"
import * as q from '@/requests'
import type { IssuePageWithCountsType } from '@/schemas/issue'
import * as utils from "@/lib/utils"
import { computed, ref, type Ref } from 'vue'
import { useRoute } from "vue-router"
import IssueList from "../projects/[project_id]/issues/IssueList.vue"
import PageHeader from "./PageHeader.vue"
import { Card, CardFooter, CardTable, CardTopState } from '$ui/card'
import { Nav, NavItem } from '$ui/nav'
import RLink from "@/components/RLink.vue"
import { Badge } from "$ui/badge"
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const route = useRoute()
const query = utils.queryToPlain(route.query)
const EMPTY_ISSUE_PAGE: IssuePageWithCountsType = {
  total_count: 0,
  offset: 0,
  limit: 25,
  list: [],
  issue_stats: [],
}

const filter = String(query.filter ?? 'unhandled')
const sorts = ref(String(query.sorts ?? 'id desc'))

const { data: pagination, isLoading } = line.request(q.profile.issues.Page(), (req, it) => {
  req.query = { ...utils.plainToQuery(query), filter: filter, sorts: sorts.value }
  return it.useQuery({
    ...req.toQueryConfig(),
    placeholderData: EMPTY_ISSUE_PAGE,
  })
})

let unhandled_issue_page: Ref<IssuePageWithCountsType> = ref(EMPTY_ISSUE_PAGE)
if (filter != 'unhandled') {
  const { data: unhandled_temp } = line.request(q.profile.issues.Page(), (req, it) => {
    req.query = { per_page: 1, filter: 'unhandled' }
    return it.useQuery({
      ...req.toQueryConfig(),
      placeholderData: {
        ...EMPTY_ISSUE_PAGE,
        limit: 1,
      },
    })
  })
  unhandled_issue_page = unhandled_temp
}

const unhandled_issues_count = computed(() => {
  if (filter == 'unhandled') {
    return pagination.value.total_count
  } else {
    return unhandled_issue_page.value.total_count
  }
})
</script>
