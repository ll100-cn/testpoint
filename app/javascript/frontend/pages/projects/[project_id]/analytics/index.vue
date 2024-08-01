<template>
  <PageHeader>
    <PageTitle>所有统计报表</PageTitle>
  </PageHeader>

  <div class="columns-2">
    <div class="mb-3">
      <Card>
        <CardContent>
          <h3 class="card-title">工单提交数</h3>
          <p class="card-text">根据标签统计每个人创建的工单数量</p>

          <Button :to="`/projects/${project_id}/analytics/issue_creator_chart`" size="sm">查看</Button>
        </CardContent>
      </Card>
    </div>

    <div class="mb-3">
      <Card>
        <CardContent>
          <h3 class="card-title">工单处理时间</h3>
          <p class="card-text">工单经过每个流程分别花费的时间</p>

          <Button :to="`/projects/${project_id}/analytics/issue_activity_chart`" size="sm">查看</Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { useRoute } from 'vue-router'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardTopState } from '$vendor/ui'

const route = useRoute()
const params = route.params as any
const project_id = params.project_id
</script>
