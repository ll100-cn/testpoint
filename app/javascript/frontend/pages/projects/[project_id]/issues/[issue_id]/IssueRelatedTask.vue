<template>
  <p class="flex items-center">
    <span class="text-muted">该问题来自测试</span>
    <span><router-link :to="`${path_info.parent.resource}/plans/${task.planId}`">{{ test_case_box.testCase.title }}</router-link></span>
    <Badge preset="standard" variant="secondary" class="ms-1">{{ plan_box.plan.platform.name }}</Badge>
  </p>
</template>

<script setup lang="ts">

import { Task } from "@/models"
import * as q from '@/requests'
import Badge from "$ui/badge/Badge.vue";
import { useQueryLine } from '@/lib/useQueryLine'
import PathHelper from '@/lib/PathHelper'
import { useRoute } from 'vue-router'

const line = useQueryLine()
const props = defineProps<{
  task: Task
  project_id: number
}>()

const route = useRoute()
const params = route.params as any
const path_info = PathHelper.parseMember(route.path, 'show')

const { data: test_case_box } = line.request(q.case.test_cases.Get(), (req, it) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.test_case_id = props.task.testCaseId!
  return it.useQuery(req.toQueryConfig())
})
const { data: plan_box } = line.request(q.test.plans.Get(), (req, it) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.plan_id = props.task.planId
  return it.useQuery(req.toQueryConfig())
})
await line.wait()
</script>
