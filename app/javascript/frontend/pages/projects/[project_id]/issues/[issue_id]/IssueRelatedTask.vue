<template>
  <p class="d-flex align-items-center">
    <span class="text-muted">该问题来自测试</span>
    <span><router-link :to="`/projects/${project_id}/plans/${task.plan_id}`">{{ test_case.title }}</router-link></span>
    <span class="badge bg-secondary ms-1">{{ plan.platform.name }}</span>
  </p>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { Task } from "@/models"
import * as requests from "@/requests"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  task: Task
  project_id: number
}>()

const test_case = ref(await new requests.TestCaseGet().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.test_case_id = props.task.test_case_id
}).perform())

const plan = ref(await new requests.PlanShow().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
  req.interpolations.plan_id = props.task.plan_id
}).perform())
</script>
