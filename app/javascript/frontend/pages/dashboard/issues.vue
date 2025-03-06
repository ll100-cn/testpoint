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
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { getCurrentInstance, ref } from 'vue'
import { useRoute } from "vue-router"
import IssueList from "../projects/[project_id]/issues/IssueList.vue"
import PageHeader from "./PageHeader.vue"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '@/ui'
import { Nav, NavList, NavItem } from '@/ui'

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const query = utils.queryToPlain(route.query)

const filter = query.filter || 'unhandled'
const unhandled_issues_count = ref(0)

const sorts = ref(query.sorts ?? 'id desc')

const pagination = ref(await new q.profile.issues.Page().setup(proxy, req => {
  req.query = utils.plainToQuery(query)
  req.query.filter = filter
  req.query.sorts = sorts.value
}).perform())

if (filter == 'unhandled') {
  unhandled_issues_count.value = pagination.value.total_count
} else {
  const unhandled = await new q.profile.issues.Page().setup(proxy, req => {
    req.query.per_page = 1
    req.query.filter = 'unhandled'
  }).perform()
  unhandled_issues_count.value = unhandled.total_count
}
</script>
