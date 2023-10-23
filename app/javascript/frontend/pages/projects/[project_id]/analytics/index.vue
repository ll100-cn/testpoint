<template>
  <div class="page-header">
    <h2>所有统计报表</h2>
  </div>

  <div class="row">
    <div class="col-12 col-sm-12 col-md-4 col-lg-3 mb-3">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">工单提交数</h3>
          <p class="card-text">根据标签统计每个人创建的工单数量</p>

          <router-link :to="`/projects/${project_id}/analytics/issue_creator_chart`" class="btn btn-primary btn-sm">查看</router-link>
        </div>
      </div>
    </div>

    <div class="col-12 col-sm-12 col-md-4 col-lg-3 mb-3">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">工单处理时间</h3>
          <p class="card-text">工单经过每个流程分别花费的时间</p>

          <router-link :to="`/projects/${project_id}/analytics/issue_activity_chart`" class="btn btn-primary btn-sm">查看</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const params = route.params as any
const project_id = params.project_id
</script>
