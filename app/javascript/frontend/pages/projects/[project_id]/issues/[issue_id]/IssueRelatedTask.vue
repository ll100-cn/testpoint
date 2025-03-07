<template>
  <p class="flex items-center">
    <span class="text-muted">该问题来自测试</span>
    <span><router-link :to="`/projects/${project_id}/plans/${task.plan_id}`">{{ test_case.title }}</router-link></span>
    <Badge preset="standard" variant="secondary" class="ms-1">{{ plan_info.platform.name }}</Badge>
  </p>
</template>

<script setup lang="ts">
import useRequestList from '@bbb/useRequestList'

import { Task } from "@/models"
import * as q from '@/lib/requests'
import Badge from "@/ui/badge/Badge.vue";

const reqs = useRequestList()
const props = defineProps<{
  task: Task
  project_id: number
}>()

const test_case = reqs.add(q.case.test_cases.Get).setup(req => {
  req.interpolations.project_id = props.project_id
  req.interpolations.test_case_id = props.task.test_case_id
}).wait()
const plan_info = reqs.add(q.test.plans.InfoGet).setup(req => {
  req.interpolations.project_id = props.project_id
  req.interpolations.plan_id = props.task.plan_id
}).wait()
await reqs.performAll()
</script>
