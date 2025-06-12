<template>
  <p class="flex items-center">
    <span class="text-muted">该问题来自测试</span>
    <span><router-link :to="`/projects/${project_id}/plans/${task.plan_id}`">{{ test_case_box.test_case.title }}</router-link></span>
    <Badge preset="standard" variant="secondary" class="ms-1">{{ plan_box.plan.platform.name }}</Badge>
  </p>
</template>

<script setup lang="ts">

import { Task } from "@/models"
import * as q from '@/requests'
import Badge from "$ui/badge/Badge.vue";
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const props = defineProps<{
  task: Task
  project_id: number
}>()

const { data: test_case_box } = line.request(q.case.test_cases.Get(), (req, it) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.test_case_id = props.task.test_case_id
  return it.useQuery(req.toQueryConfig())
})
const { data: plan_box } = line.request(q.test.plans.InfoGet(), (req, it) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.plan_id = props.task.plan_id
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
</script>
