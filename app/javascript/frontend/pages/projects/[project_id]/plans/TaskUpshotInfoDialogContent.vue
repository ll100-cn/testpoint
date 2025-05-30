<template>
  <DialogContent class="max-w-4xl" v-if="!loading">
    <DialogHeader>
      <DialogTitle>{{ task_upshot_box.test_case?.title }}</DialogTitle>
    </DialogHeader>

    <PageContent v-if="content.length > 0" :content="content" :readonly="!is_last_phase || !allow('update', task_upshot_box)" />

    <small v-else class="text-muted">无详细信息</small>

    <hr>
    <TaskDetailsState :task_box="task_box" :phase_infos="plan_box.phase_infos" :current_phase_id="current_phase_id" />

    <DialogFooter v-if="is_last_phase">
      <template v-if="task_box.task.ignore_at != null">
        <Button v-if="allow('update', task_box.task)" @click.prevent="actioner.unignoreTask()">取消忽略</Button>
      </template>
      <template v-else-if="task_upshot_box.task_upshot.state == 'pending'">
        <Button variant="secondary" v-if="allow('update', task_box.task)" class="me-auto" :disabled="actioner.processing" @click.prevent="actioner.ignoreTask()">忽略</Button>

        <template v-if="allow('update', task_upshot_box.task_upshot)">
          <Button variant="primary" @click.prevent="actioner.updateTaskUpshotState('pass')">设置为通过</Button>
          <Button variant="destructive" @click.prevent="emit('switch', TaskUpshotFailureDialogContent, task_upshot_box, task_box)">不通过</Button>
          <Button variant="secondary" v-if="task_upshot_box.task_upshot.state_override && prev_task_upshot" @click.prevent="actioner.updateTaskUpshotState(null)">保留上一轮结果 ({{ TASK_UPSHOT_STATES[prev_task_upshot.state] }})</Button>
        </template>
      </template>
      <template v-else>
        <Button v-if="allow('update', task_upshot_box.task_upshot)" @click.prevent="actioner.updateTaskUpshotState('pending')">撤销测试结果</Button>
      </template>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import { Actioner } from "@/components/Actioner"
import useRequestList from '@/lib/useRequestList'
import { TASK_UPSHOT_STATES } from "@/constants"
import * as q from '@/requests'
import { PlanBox, TaskBox, TaskUpshotBox } from '@/models'
import { usePageStore } from "@/store"
import _ from 'lodash'
import { type Component, computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import TaskDetailsState from './TaskDetailsState.vue'
import TaskUpshotFailureDialogContent from "./TaskUpshotFailureDialogContent.vue"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { Button } from '$ui/button'
import PageContent from "@/components/PageContent.vue"

const reqs = useRequestList()
const page = usePageStore()
const allow = page.inProject()!.allow

const props = defineProps<{
  plan_box: PlanBox
  current_phase_id: number
}>()

const emit = defineEmits<{
  updated: [ TaskUpshotBox ]
  switch: [ compoenent: Component, ...args: any[] ]
}>()

const task_upshot_box = ref(null! as TaskUpshotBox)
const task_box = ref(null! as TaskBox)

const is_last_phase = computed(() => {
  return _.last(props.plan_box.phase_infos)?.phase.id == task_upshot_box.value.task_upshot.phase_id
})

const content = ref("")
watch(content, (new_value) => {
  if (loading.value) {
    return
  }

  actioner.submitContent(new_value)
})

const prev_task_upshot = computed(() => {
  const index = task_box.value.task_upshots?.findIndex(it => it.id == task_upshot_box.value.task_upshot.id)
  return index != null ? task_box.value.task_upshots?.[index - 1] : null
})

const actioner = Actioner.build<{
  submitContent: (content: string) => void
  ignoreTask: () => void
  unignoreTask: () => void
  updateTaskUpshotState: (state_override: "pass" | "pending" | null) => void
}>()

actioner.submitContent = function(content: string) {
  this.perform(async () => {
    const a_task_upshot_box = await reqs.add(q.test.task_upshot_contents.Update).setup(req => {
      req.interpolations.project_id = props.plan_box.plan.project_id
      req.interpolations.plan_id = props.plan_box.plan.id
      req.interpolations.task_id = task_upshot_box.value.task!.id
      req.interpolations.upshot_id = task_upshot_box.value.task_upshot.id
    }).perform({ content })

    Object.assign(task_upshot_box.value.task_upshot, a_task_upshot_box.task_upshot)
    const index = task_box.value.task_upshots?.findIndex(it => it.id == task_upshot_box.value.task_upshot.id)
    if (index != null) {
      task_box.value.task_upshots![index] = a_task_upshot_box.task_upshot
    }
    emit('updated', task_upshot_box.value)
  }, { confirm_text: false })
}

actioner.ignoreTask = function() {
  this.perform(async function() {
    const a_task_box = await reqs.add(q.test.tasks.Ignore).setup(req => {
      req.interpolations.project_id = props.plan_box.plan.project_id
      req.interpolations.plan_id = props.plan_box.plan.id
      req.interpolations.id = task_box.value.task.id
    }).perform()

    Object.assign(task_box.value.task, a_task_box.task)
    task_upshot_box.value.task = a_task_box.task
    emit('updated', task_upshot_box.value)
  })
}

actioner.unignoreTask = function() {
  this.perform(async function() {
    const a_task_box = await reqs.add(q.test.tasks.Unignore).setup(req => {
      req.interpolations.project_id = props.plan_box.plan.project_id
      req.interpolations.plan_id = props.plan_box.plan.id
      req.interpolations.id = task_box.value.task.id
    }).perform()

    Object.assign(task_box.value.task, a_task_box.task)
    task_upshot_box.value.task = a_task_box.task
    emit('updated', task_upshot_box.value)
  })
}

actioner.updateTaskUpshotState = function(state_override: "pass" | "pending" | null) {
  this.perform(async function() {
    const a_task_upshot_box = await reqs.add(q.test.task_upshot_states.Update).setup(req => {
      req.interpolations.project_id = props.plan_box.plan.project_id
      req.interpolations.plan_id = props.plan_box.plan.id
      req.interpolations.task_id = task_box.value.task.id
      req.interpolations.upshot_id = task_upshot_box.value.task_upshot.id
    }).perform({ task_upshot: { state_override } })

    Object.assign(task_upshot_box.value.task_upshot, a_task_upshot_box.task_upshot)
    const index = task_box.value.task_upshots?.findIndex(it => it.id == task_upshot_box.value.task_upshot.id)
    if (index != null) {
      task_box.value.task_upshots![index] = a_task_upshot_box.task_upshot
    }
    emit('updated', task_upshot_box.value)
  })
}

const loading = ref(true)
async function reset(a_task_upshot_box: TaskUpshotBox) {
  loading.value = true

  task_upshot_box.value = a_task_upshot_box
  task_box.value = await reqs.add(q.test.tasks.InfoGet).setup(req => {
    req.interpolations.project_id = props.plan_box.plan.project_id
    req.interpolations.plan_id = props.plan_box.plan.id
    req.interpolations.task_id = task_upshot_box.value.task!.id
  }).perform()

  content.value = task_upshot_box.value.task_upshot.content ?? task_upshot_box.value.test_case?.content ?? ""

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>
