<template>
  <PageHeader :issues_count="unhandled_issues_count" current="issues" />

  <Nav :model-value="filter">
    <NavList preset="tabs">
      <NavItem value="unhandled" class="me-auto" as-child>
        <router-link :to="{ query: {} }">
          待处理的
          <span class="badge bg-danger ms-1 rounded-pill">{{ unhandled_issues_count }}</span>
        </router-link>
      </NavItem>

      <NavItem value="created" as-child>
        <router-link :to="{ query: { filter: 'created' } }">
          创建的
        </router-link>
      </NavItem>

      <NavItem value="subscribed" as-child>
        <router-link :to="{ query: { filter: 'subscribed' } }">
          关注的
        </router-link>
      </NavItem>

      <NavItem value="assigned" as-child>
        <router-link :to="{ query: { filter: 'assigned' } }">
          受理的
        </router-link>
      </NavItem>

      <NavItem value="archived" as-child>
        <router-link :to="{ query: { filter: 'archived' } }">
          归档的
        </router-link>
      </NavItem>
    </NavList>
  </Nav>

  <Card class="rounded-t-none">
    <CardContent>
      <IssueList :issues="pagination.list" :columns="['project']" :sorts="sorts" />
    </CardContent>
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$ui/card'
import { Nav, NavList, NavItem } from '$ui/nav'
import type { Issue, Pagination } from "@/models"

const reqs = useRequestList()
const route = useRoute()
const query = utils.queryToPlain(route.query)

const filter = query.filter || 'unhandled'
const sorts = ref(query.sorts ?? 'id desc')

const pagination = reqs.add(q.profile.issues.Page).setup(req => {
  req.query = utils.plainToQuery(query)
  req.query.filter = filter
  req.query.sorts = sorts.value
}).wait()

let unhandled_issues = ref(null as Pagination<Issue> | null)
if (filter != 'unhandled') {
  reqs.add(q.profile.issues.Page).setup(req => {
    req.query.per_page = 1
    req.query.filter = 'unhandled'
  }).waitFor(unhandled_issues)
}
await reqs.performAll()

const unhandled_issues_count = computed(() => {
  if (filter == 'unhandled') {
    return pagination.value.total_count
  } else {
    return unhandled_issues.value?.total_count ?? 0
  }
})
</script>
