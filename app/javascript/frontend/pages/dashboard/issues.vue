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
      <table class="table">
        <colgroup>
          <col width="5%">
          <col width="30%">
          <col width="10%">
          <col width="15%">
          <col width="10%">
          <col width="10%">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>分类</th>
            <th>状态</th>
            <th>创建人</th>
            <th>受理人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="issue in pagination.list" :class="{ 'block-discard': issue.state == 'closed' }">
            <td>{{ issue.id }}</td>
            <td><IssueLink v-bind="{ issue }" /></td>
            <td><span class="badge" :style="`background-color: ${issue.category?.color}`">{{ issue.category?.name }}</span></td>
            <td><IssueStateBadge :state="issue.state" /></td>
            <td>{{ issue.creator.name }}</td>
            <td>{{ issue.assignee?.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <PaginationBar2 :pagination="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IssueLink from "@/components/IssueLink.vue"
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import PaginationBar2 from "@/components/PaginationBar2.vue"
import * as utils from "@/lib/utils"
import * as requests from '@/lib/requests'
import { getCurrentInstance, ref } from 'vue'
import { useRoute } from "vue-router"
import PageHeader from "./PageHeader.vue"

const proxy = getCurrentInstance()!.proxy!
const route = useRoute()
const query = utils.queryToPlain(route.query)

const filter = query.filter || 'unhandled'
const unhandled_issues_count = ref(0)

const pagination = ref(await new requests.IssueReq.Page().setup(proxy, req => {
  req.query.filter = filter
}).perform())

if (filter == 'unhandled') {
  unhandled_issues_count.value = pagination.value.total_count
} else {
  const unhandled = await new requests.IssueReq.Page().setup(proxy, req => {
    req.query.per_page = 1
    req.query.filter = 'unhandled'
  }).perform()
  unhandled_issues_count.value = unhandled.total_count
}
</script>