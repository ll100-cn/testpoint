<template>
  <div class="page-header d-flex align-items-end">
    <h2 class="me-3">仪表盘</h2>

    <router-link class="text-secondary me-3" to="/dashboard">
      <i class="far fa-square" /> 按项目
    </router-link>

    <router-link class="text-primary" to="/issues">
      <i class="far fa-check-square" /> 按个人
      <span class="text-danger">
        ({{ total_issues.total_count }})
      </span>
    </router-link>
  </div>

  <div class="nav-scroll mb-n1px position-relative zindex-999">
    <ul class="nav nav-tabs">
      <li class="nav-item me-auto">
        <router-link class="nav-item nav-link" :class="{ 'active': filter == null }" to="/issues">
          待处理的
          <span class="badge bg-danger ms-1 rounded-pill">{{ total_issues.total_count }}</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item nav-link" :class="{ 'active': filter == 'created' }" :to="`/issues?filter=created`">
          创建的
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item nav-link" :class="{ 'active': filter == 'focused' }" :to="`/issues?filter=focused`">
          关注的
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item nav-link" :class="{ 'active': filter == 'assigned' }" :to="`/issues?filter=assigned`">
          受理的
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item nav-link" :class="{ 'active': filter == 'archived' }" :to="`/issues?filter=archived`">
          归档的
        </router-link>
      </li>
    </ul>
  </div>

  <div class="card rounded-top-left-0 card-x-table">
    <div class="card-body">
      <table class="table">
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
          <tr v-for="issue in issues.list" :key="issue.id" :class="{ 'block-discard': issue.state == 'closed' }">
            <td>{{ issue.id }}</td>
            <td><router-link :to="`/projects/${issue.project_id}/issues/${issue.id}`">{{ issue.title }}</router-link></td>
            <td><span class="badge" :style="`background-color: ${issue.category?.color}`">{{ issue.category?.name }}</span></td>
            <td><IssueStateBadge :issue_state="issue.state" /></td>
            <td>{{ issue.creator?.name }}</td>
            <td>{{ issue.assignee?.name }}</td>
          </tr>
        </tbody>
      </table>
      <PaginationBar2 class="mb-0 mt-2" :pagination="issues" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as utils from "@/lib/utils"
import * as requests from '@/requests'
import { getCurrentInstance, ref } from 'vue'
import IssueStateBadge from "@/components/IssueStateBadge.vue"
import PaginationBar2 from "@/components/PaginationBar2.vue"
import { useRoute, useRouter } from "vue-router"

const proxy = getCurrentInstance()!.proxy!
const router = useRouter()
const route = useRoute()
const query = utils.queryToPlain(route.query)
const filter = query.filter
console.log(filter)

const total_issues = ref(await new requests.IssuePaginationList().setup(proxy, (req) => {
  req.query.per_page = 1
}).perform())

const issues = ref(await new requests.IssuePaginationList().setup(proxy, (req) => {
  req.query.filter = filter
}).perform())

</script>
