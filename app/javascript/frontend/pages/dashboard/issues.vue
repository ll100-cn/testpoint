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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import * as utils from "@/lib/utils"
import { computed, getCurrentInstance, ref } from 'vue'
import { useRoute } from "vue-router"
import IssueList from "../projects/[project_id]/issues/IssueList.vue"
import PageHeader from "./PageHeader.vue"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTable, CardTitle, CardTopState } from '$ui/card'
import { Nav, NavItem } from '$ui/nav'
import type { Issue, IssueBox, IssuePage, Pagination } from "@/models"
import RLink from "@/components/RLink.vue"
import { Badge } from "$ui/badge"
import { useQueryLine } from '@/lib/useQueryLine'

const reqs = useRequestList()
const line = useQueryLine()
const route = useRoute()
const query = utils.queryToPlain(route.query)

const filter = query.filter || 'unhandled'
const sorts = ref(query.sorts ?? 'id desc')

const { data: pagination } = line.request(q.profile.issues.Page, (req, it) => {
  req.query = { ...utils.plainToQuery(query), filter: filter, sorts: sorts.value }
  return it.useQuery(req.toQueryConfig())
})

let unhandled_issue_page = ref(null as IssuePage<IssueBox> | null)
if (filter != 'unhandled') {
  const { data: unhandled_temp } = line.request(q.profile.issues.Page, (req, it) => {
    req.query = { per_page: 1, filter: 'unhandled' }
    return it.useQuery(req.toQueryConfig())
  })
  unhandled_issue_page = unhandled_temp
}
await line.wait()

const unhandled_issues_count = computed(() => {
  if (filter == 'unhandled') {
    return pagination.value.total_count
  } else {
    return unhandled_issue_page.value?.total_count ?? 0
  }
})
</script>
