<template>
  <PageHeader :issues_count="unhandled_issues_count" current="issues" />

  <div class="nav-scroll mb-n1px position-relative zindex-999">
    <div class="nav nav-tabs">
      <router-link class="nav-item nav-link me-auto" :class="{ 'active': filter == 'unhandled' }" :to="{ query: { } }">
        待处理的
        <span class="badge bg-danger ms-1 rounded-pill">{{ unhandled_issues_count }}</span>
      </router-link>

      <router-link class="nav-item nav-link" :class="{ 'active': filter == 'created' }" :to="{ query: { filter: 'created' } }">
        创建的
      </router-link>

      <router-link class="nav-item nav-link" :class="{ 'active': filter == 'subscribed' }" :to="{ query: { filter: 'subscribed' } }">
        关注的
      </router-link>

      <router-link class="nav-item nav-link" :class="{ 'active': filter == 'assigned' }" :to="{ query: { filter: 'assigned' } }">
        受理的
      </router-link>

      <router-link class="nav-item nav-link" :class="{ 'active': filter == 'archived' }" :to="{ query: { filter: 'archived' } }">
        归档的
      </router-link>
    </div>
  </div>

  <div class="card rounded-top-left-0 card-x-table">
    <div class="card-body">
      <IssueList :issues="pagination.list" :columns="['project']" />
    </div>
    <div class="card-footer">
      <PaginationBar :pagination="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PaginationBar from "@/components/PaginationBar.vue"
import * as q from '@/lib/requests'
import * as utils from "@/lib/utils"
import { getCurrentInstance, ref } from 'vue'
import { useRoute } from "vue-router"
import IssueList from "../projects/[project_id]/issues/IssueList.vue"
import PageHeader from "./PageHeader.vue"

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const query = utils.queryToPlain(route.query)

const filter = query.filter || 'unhandled'
const unhandled_issues_count = ref(0)

const pagination = ref(await new q.profile.IssueReq.Page().setup(proxy, req => {
  req.query = utils.plainToQuery(query)
  req.query.filter = filter
}).perform())

if (filter == 'unhandled') {
  unhandled_issues_count.value = pagination.value.total_count
} else {
  const unhandled = await new q.profile.IssueReq.Page().setup(proxy, req => {
    req.query.per_page = 1
    req.query.filter = 'unhandled'
  }).perform()
  unhandled_issues_count.value = unhandled.total_count
}
</script>