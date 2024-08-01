<template>
  <DialogContent class="max-w-4xl" v-if="!loading">
    <DialogHeader>
      <DialogTitle>{{ task_upshot_info.test_case.title }}</DialogTitle>
    </DialogHeader>

    <textarea v-if="content.length > 0" v-model="content" data-controller="markdown" data-action="render->markdown#render" class="hidden" :readonly="!is_last_phase || !allow('update', task_upshot_info)" />
    <small v-else class="text-muted">无详细信息</small>

    <hr>
    <TaskDetailsState :task_info="task_info" :phase_infos="plan_info.phase_infos" :current_phase_id="current_phase_id" />

    <DialogFooter v-if="is_last_phase">
      <template v-if="task_info.ignore_at != null">
        <Button v-if="allow('update', task_info)" @click.prevent="actioner.unignoreTask()">取消忽略</Button>
      </template>
      <template v-else-if="task_upshot_info.state == 'pending'">
        <Button variant="secondary" v-if="allow('update', task_info)" class="me-auto" :disabled="actioner.processing" @click.prevent="actioner.ignoreTask()">忽略</Button>

        <template v-if="allow('update', task_upshot_info)">
          <Button variant="primary" @click.prevent="actioner.updateTaskUpshotState('pass')">设置为通过</Button>
          <Button variant="destructive" @click.prevent="emit('switch', TaskUpshotFailureDialogContent, task_upshot_info, task_info)">不通过</Button>
          <Button variant="secondary" v-if="task_upshot_info.state_override && prev_task_upshot" @click.prevent="actioner.updateTaskUpshotState(null)">保留上一轮结果 ({{ TASK_UPSHOT_STATES[prev_task_upshot.state] }})</Button>
        </template>
      </template>
      <template v-else>
        <Button v-if="allow('update', task_upshot_info)" @click.prevent="actioner.updateTaskUpshotState('pending')">撤销测试结果</Button>
      </template>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import { Actioner } from "@/components/Actioner"
import { TASK_UPSHOT_STATES } from "@/constants"
import * as q from '@/lib/requests'
import { PlanInfo, TaskInfo, TaskUpshotInfo } from '@/models'
import { usePageStore } from "@/store"
import _ from 'lodash'
import { type Component, computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import TaskDetailsState from './TaskDetailsState.vue'
import TaskUpshotFailureDialogContent from "./TaskUpshotFailureDialogContent.vue"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, Button } from '$vendor/ui'

const proxy = getCurrentInstance()!.proxy as any
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  plan_info: PlanInfo
  current_phase_id: number
}>()

const emit = defineEmits<{
  updated: [ TaskUpshotInfo ]
  switch: [ compoenent: Component, ...args: any[] ]
}>()

const task_upshot_info = ref(null! as TaskUpshotInfo)
const task_info = ref(null! as TaskInfo)

const is_last_phase = computed(() => {
  return _.last(props.plan_info.phase_infos)?.id == task_upshot_info.value.phase_id
})

const content = ref("")
watch(content, (new_value) => {
  if (loading.value) {
    return
  }

  actioner.submitContent(new_value)
})

const prev_task_upshot = computed(() => {
  const index = task_info.value.task_upshots.findIndex(it => it.id == task_upshot_info.value.id)
  return task_info.value.task_upshots[index - 1]
})

const actioner = Actioner.build<{
  submitContent: (content: string) => void
  ignoreTask: () => void
  unignoreTask: () => void
  updateTaskUpshotState: (state_override: "pass" | "pending" | null) => void
}>()

actioner.submitContent = function(content: string) {
  this.perform(async () => {
    const a_task_upshot = await new q.test.TaskUpshotContentReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = props.plan_info.project_id
      req.interpolations.plan_id = props.plan_info.id
      req.interpolations.task_id = task_upshot_info.value.task.id
      req.interpolations.upshot_id = task_upshot_info.value.id
    }).perform({ content: content })

    Object.assign(task_upshot_info.value, a_task_upshot)
    const index = task_info.value.task_upshots.findIndex(it => it.id == task_upshot_info.value.id)
    task_info.value.task_upshots[index] = a_task_upshot
    emit('updated', task_upshot_info.value)
  }, { confirm_text: false })
}

actioner.ignoreTask = function() {
  this.perform(async function() {
    const task = await new q.test.TaskReq.Ignore().setup(proxy, (req) => {
      req.interpolations.project_id = props.plan_info.project_id
      req.interpolations.plan_id = props.plan_info.id
      req.interpolations.id = task_info.value.id
    }).perform()

    Object.assign(task_info.value, task)
    task_upshot_info.value.task = task
    emit('updated', task_upshot_info.value)
  })
}

actioner.unignoreTask = function() {
  this.perform(async function() {
    const task = await new q.test.TaskReq.Unignore().setup(proxy, (req) => {
      req.interpolations.project_id = props.plan_info.project_id
      req.interpolations.plan_id = props.plan_info.id
      req.interpolations.id = task_info.value.id
    }).perform()

    Object.assign(task_info.value, task)
    task_upshot_info.value.task = task
    emit('updated', task_upshot_info.value)
  })
}

actioner.updateTaskUpshotState = function(state_override: "pass" | "pending" | null) {
  this.perform(async function() {
    const a_task_upshot = await new q.test.TaskUpshotStateReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = props.plan_info.project_id
      req.interpolations.plan_id = props.plan_info.id
      req.interpolations.task_id = task_info.value.id
      req.interpolations.upshot_id = task_upshot_info.value.id
    }).perform({ task_upshot: { state_override } })

    Object.assign(task_upshot_info.value, a_task_upshot)
    const index = task_info.value.task_upshots.findIndex(it => it.id == task_upshot_info.value.id)
    task_info.value.task_upshots[index] = a_task_upshot
    emit('updated', task_upshot_info.value)
  })
}

const loading = ref(true)
async function reset(a_task_upshot_info: TaskUpshotInfo) {
  loading.value = true

  task_upshot_info.value = a_task_upshot_info
  task_info.value = await new q.test.TaskInfoReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = props.plan_info.project_id
    req.interpolations.plan_id = props.plan_info.id
    req.interpolations.task_id = task_upshot_info.value.task.id
  }).perform()

  content.value = task_upshot_info.value.content ?? task_upshot_info.value?.test_case?.content ?? ""

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>
