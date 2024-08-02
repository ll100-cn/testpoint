<template>
  <p class="flex items-center">
    <span class="text-muted">该问题来自测试</span>
    <span><router-link :to="`/projects/${project_id}/plans/${task.plan_id}`">{{ test_case.title }}</router-link></span>
    <Badge preset="standard" variant="secondary" class="ms-1">{{ plan_info.platform.name }}</Badge>
  </p>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { Task } from "@/models"
import * as q from '@/lib/requests'
import Badge from "$vendor/ui/badge/Badge.vue";

const proxy = getCurrentInstance()!.proxy as any
const props = defineProps<{
  task: Task
  project_id: number
}>()

const test_case = ref(await new q.case.TestCaseReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.test_case_id = props.task.test_case_id
}).perform())

const plan_info = ref(await new q.test.PlanInfoReq.Get().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.plan_id = props.task.plan_id
}).perform())
</script>
