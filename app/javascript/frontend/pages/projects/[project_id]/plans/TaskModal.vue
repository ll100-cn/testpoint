<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
      <div v-if="mode == 'shown'" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            测试指南 - <span>{{ current_task_upshot_info.test_case.title }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>

        <div class="modal-body">
          <div class="text-center">
            <a
              v-if="is_task_pass"
              role="button"
              href=""
              data-bs-toggle="collapse"
              data-bs-target="#TaskDetails">
              测试详情
              <i class="far fa-chevron-down" />
            </a>
          </div>

          <div id="TaskDetails" class="collapse" data-bs-toggle="collapse" :class="{ 'show': !is_task_pass }">
            <form @change="submitContent">
              <textarea
                v-if="current_content"
                id="content"
                ref="textarea"
                v-model="current_content"
                name="content"
                data-controller="markdown"
                data-action="render->markdown#render"
                class="d-none" />
              <small v-else class="text-muted">无详细信息</small>
            </form>
            <hr>
            <TaskDetailsState
              :key="current_task_upshot_info.id"
              :task_info="task_info"
              :phase_infos="phase_infos"
              :current_phase_id="current_phase_id"
              :project_id="project_id" />
          </div>
          <hr>
          <TaskDetailsAction
            v-if="current_phase_id == _.last(phase_infos).id"
            :key="current_task_upshot_info.id"
            v-model:is_task_pass="is_task_pass"
            :issue_templates="issue_templates"
            :phase_infos="phase_infos"
            :plan="plan"
            :project_id="project_id"
            :task_upshot_info="current_task_upshot_info"
            @ignore="ignore"
            @unignore="unignore"
            @updated="updated" />
        </div>
      </div>
      <div v-if="mode == 'show'" class="modal-content">
        <div class="d-flex justify-content-center">
          <div class="spinner-border p-5 m-5" role="status" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, onUpdated, reactive, ref } from 'vue'
import { Validations } from "@/components/simple_form"
import { IssueTemplate, PhaseInfo, Plan, TaskInfo, TaskUpshot, TaskUpshotInfo } from '@/models'
import * as q from '@/lib/requests'
import { Modal } from 'bootstrap'
import _ from 'lodash'
import TaskDetailsAction from './TaskDetailsAction.vue'
import TaskDetailsState from './TaskDetailsState.vue'

const { proxy } = getCurrentInstance()

const props = withDefaults(defineProps<{
  phase_infos: PhaseInfo[]
  current_phase_id: number
  issue_templates: IssueTemplate[]
  project_id: number
  plan: Plan
}>(), {
  platforms: () => [],
  phase_infos: () => [],
})

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
}>()

const validations = reactive<Validations>(new Validations())
const modal = ref<InstanceType<typeof HTMLElement>>()
const mode = ref<'show' | 'shown' | 'hide' | 'hidden'>('show')
const is_task_pass = ref(false)

const current_task_upshot_info = ref()

const task_info = ref<TaskInfo>()
const textarea = ref()

const current_content = computed(() => {
  return current_task_upshot_info.value.content ?? current_task_upshot_info.value?.test_case?.content
})

async function show(id: number) {
  mode.value = 'show'

  nextTick(async () => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.show()

    await getData(id)

    mode.value = 'shown'
  })
}

async function hide() {
  mode.value = 'hide'

  nextTick(() => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.hide()
    mode.value = 'hidden'
  })
}

async function submitContent(event: InputEvent) {
  const formData = new FormData(event.currentTarget as HTMLFormElement)

  try {
    const task_upshot = await new q.test.TaskUpshotContentReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = props.project_id
      req.interpolations.plan_id = props.plan.id
      req.interpolations.task_id = current_task_upshot_info.value.task.id
      req.interpolations.upshot_id = current_task_upshot_info.value.id
    }).perform(formData)
    if (task_upshot) {
      emit('updated', task_upshot)
    }
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

async function getData(id: number) {
  current_task_upshot_info.value = await new q.test.TaskUpshotInfoReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = props.project_id
    req.interpolations.plan_id = props.plan.id
    req.interpolations.phase_index = _.findIndex(props.phase_infos, { id: props.current_phase_id })
    req.interpolations.id = id
  }).perform()

  task_info.value = await new q.test.TaskInfoReq.Get().setup(proxy, (req) => {
    req.interpolations.project_id = props.project_id
    req.interpolations.plan_id = props.plan.id
    req.interpolations.task_id = current_task_upshot_info.value.task.id
  }).perform()
}

async function updated(task_upshot: TaskUpshot) {
  await getData(task_upshot.id)
  emit("updated", current_task_upshot_info.value)
}

async function ignore(task_upshot_info: TaskUpshotInfo) {
  try {
    const task = await new q.test.TaskReq.Ignore().setup(proxy, (req) => {
      req.interpolations.project_id = props.project_id
      req.interpolations.plan_id = props.plan.id
      req.interpolations.id = task_upshot_info.task.id
    }).perform()

    if (task) {
      await getData(task_upshot_info.id)
      emit('updated', current_task_upshot_info.value)
    }
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

async function unignore(task_upshot_info: TaskUpshotInfo) {
  try {
    const task = await new q.test.TaskReq.Unignore().setup(proxy, (req) => {
      req.interpolations.project_id = props.project_id
      req.interpolations.plan_id = props.plan.id
      req.interpolations.id = task_upshot_info.task.id
    }).perform()

    if (task) {
      await getData(task_upshot_info.id)
      emit('updated', current_task_upshot_info.value)
    }
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

onUpdated(() => {
  if (textarea.value) {
    textarea.value.dispatchEvent(new Event('render'))
  }
})

onMounted(() => {
  modal.value.addEventListener("hidden.bs.modal", () => {
    is_task_pass.value = false
  })
})

defineExpose({
  show,
  hide
})
</script>
