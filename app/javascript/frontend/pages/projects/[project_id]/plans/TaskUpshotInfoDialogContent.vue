<template>
  <DialogContent class="max-w-4xl" v-if="!loading">
    <DialogHeader>
      <DialogTitle>{{ task_upshot_box.test_case?.title }}</DialogTitle>
    </DialogHeader>

    <PageContent v-if="content.length > 0" :content="content" :readonly="!is_last_phase || !allow('update', task_upshot_box.task_upshot)" />

    <small v-else class="text-muted">无详细信息</small>

    <hr>
    <TaskDetailsState :task_box="task_box" :phase_infos="plan_box.phase_infos" :current_phase_id="current_phase_id" />

    <div>task_box.task.ignore_at is {{ task_box.task.ignore_at }}</div>

    <DialogFooter v-if="is_last_phase">
      <template v-if="task_box.task.ignore_at != null">
        <Button v-if="allow('update', task_box.task)" v-confirm="'确定操作？'" @click.prevent="unignoreTask()">取消忽略</Button>
      </template>
      <template v-else-if="task_upshot_box.task_upshot.state == 'pending'">
        <Button variant="secondary" v-if="allow('update', task_box.task)" class="me-auto" v-confirm="'确定操作？'" :disabled="actioner.processing" @click.prevent="ignoreTask()">忽略</Button>

        <template v-if="allow('update', task_upshot_box.task_upshot)">
          <Button variant="primary" @click.prevent="updateTaskUpshotState('pass')">设置为通过</Button>
          <Button variant="destructive" @click.prevent="emit('switch', TaskUpshotFailureDialogContent, task_upshot_box, task_box)">不通过</Button>
          <Button variant="secondary" v-if="task_upshot_box.task_upshot.state_override && prev_task_upshot" @click.prevent="updateTaskUpshotState(null)">保留上一轮结果 ({{ TASK_UPSHOT_STATES[prev_task_upshot.state] }})</Button>
        </template>
      </template>
      <template v-else>
        <Button v-if="allow('update', task_upshot_box.task_upshot)" @click.prevent="updateTaskUpshotState('pending')">撤销测试结果</Button>
      </template>
    </DialogFooter>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import TaskDetailsState from './TaskDetailsState.vue'
import TaskUpshotFailureDialogContent from "./TaskUpshotFailureDialogContent.vue"
import { Actioner } from "@/components/Actioner"
import PageContent from "@/components/PageContent.vue"
import type { TaskUpshotFrameEmits } from '@/components/TaskUpshotFrame'
import { TASK_UPSHOT_STATES } from "@/constants"
import { type PlanBox, type TaskBox, type TaskUpshotBox } from '@/models'
import * as q from '@/requests'
import { useQueryLine } from '@/lib/useQueryLine'
import { usePageStore } from "@/store"
import _ from 'lodash'
import { type Component, computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import vConfirm from '@/components/vConfirm'

const line = useQueryLine()
const page = usePageStore()
const allow = page.inProject()!.allow
const actioner = Actioner.build()

const props = defineProps<{
  plan_box: PlanBox
  current_phase_id: number
}>()

const emit = defineEmits<TaskUpshotFrameEmits & {
  switch: [Component, ...any]
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

  submitContent(new_value)
})

const prev_task_upshot = computed(() => {
  const index = task_box.value.task_upshots?.findIndex(it => it.id == task_upshot_box.value.task_upshot.id)
  return index != null ? task_box.value.task_upshots?.[index - 1] : null
})


const { mutateAsync: update_task_upshot_content_action } = line.request(q.test.task_upshot_contents.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: ignore_task_action } = line.request(q.test.tasks.Ignore(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: unignore_task_action } = line.request(q.test.tasks.Unignore(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: update_task_upshot_state_action } = line.request(q.test.task_upshot_states.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

async function submitContent(content: string) {
  actioner.perform(async () => {
    const a_task_upshot_box = await update_task_upshot_content_action({
      interpolations: {
        project_id: props.plan_box.plan.project_id,
        plan_id: props.plan_box.plan.id,
        task_id: task_upshot_box.value.task!.id,
        upshot_id: task_upshot_box.value.task_upshot.id
      },
      body: { content }
    })

    Object.assign(task_upshot_box.value.task_upshot, a_task_upshot_box.task_upshot)
    const index = task_box.value.task_upshots?.findIndex(it => it.id == task_upshot_box.value.task_upshot.id)
    if (index != null) {
      task_box.value.task_upshots![index] = a_task_upshot_box.task_upshot
    }
    emit('updated', task_upshot_box.value as TaskUpshotBox)
  })
}

async function ignoreTask() {
  actioner.perform(async function() {
    const a_task_box = await ignore_task_action({
      interpolations: {
        project_id: props.plan_box.plan.project_id,
        plan_id: props.plan_box.plan.id,
        task_id: task_box.value.task.id
      }
    })

    task_box.value.task = a_task_box.task
    task_box.value.task_upshots = a_task_box.task_upshots
    task_upshot_box.value.task = a_task_box.task
    emit('updated', task_upshot_box.value as TaskUpshotBox)
  })
}

async function unignoreTask() {
  actioner.perform(async function() {
    const a_task_box = await unignore_task_action({
      interpolations: {
        project_id: props.plan_box.plan.project_id,
        plan_id: props.plan_box.plan.id,
        task_id: task_box.value.task.id
      }
    })

    Object.assign(task_box.value.task, a_task_box.task)
    task_upshot_box.value.task = a_task_box.task
    emit('updated', task_upshot_box.value as TaskUpshotBox)
  })
}

async function updateTaskUpshotState(state_override: "pass" | "pending" | null) {
  actioner.perform(async function() {
    const a_task_upshot_box = await update_task_upshot_state_action({
      interpolations: {
        project_id: props.plan_box.plan.project_id,
        plan_id: props.plan_box.plan.id,
        task_id: task_box.value.task.id,
        upshot_id: task_upshot_box.value.task_upshot.id
      },
      body: { task_upshot: { state_override } }
    })

    task_upshot_box.value.task_upshot = a_task_upshot_box.task_upshot
    const index = task_box.value.task_upshots?.findIndex(it => it.id == task_upshot_box.value.task_upshot.id)
    if (index != null) {
      task_box.value.task_upshots![index] = a_task_upshot_box.task_upshot
    }
    emit('updated', task_upshot_box.value as TaskUpshotBox)
  })
}

const task_id = computed(() => task_upshot_box.value?.task?.id)
const { data: a_task_box, suspense, queryKey: task_query_key } = line.request(q.test.tasks.Get('+info'), (req, it) => {
  req.interpolations.project_id = props.plan_box.plan.project_id
  req.interpolations.plan_id = props.plan_box.plan.id
  req.interpolations.task_id = task_id as any
  return it.useQuery({
    ...req.toQueryConfig(),
    enabled: computed(() => task_id.value != null)
  })
})

const loading = ref(true)
async function reset(a_task_upshot_box: TaskUpshotBox) {
  loading.value = true

  task_upshot_box.value = { ...a_task_upshot_box }

  await suspense()
  task_box.value = a_task_box.value

  content.value = task_upshot_box.value.task_upshot.content ?? task_upshot_box.value.test_case?.content ?? ""

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>
