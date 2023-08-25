<template>
  <div ref="modal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
      <!-- <div class="modal-dialog modal-lg" role="document" style="margin-top: 400px;"> -->
      <div v-if="mode == 'shown'" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            测试指南 - <span>{{ current_task_upshot_info.test_case.title }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>

        <div class="modal-body">
          <form @change="submitForm">
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
          <ul>
            <template v-for="line in time_lines" :key="line.id">
              <li v-if="(line instanceof TaskUpshotInfo)" :style="{ listStyleType: current_phase_id == line.phase_id ? 'disclosure-closed' : 'initial'}">
                <div class="d-flex align-items-center">
                  <span class="me-2">{{ _.find(phase_infos, { id: line.phase_id }).title }}</span>
                  <template v-if="line.state_override">
                    <template v-for="(state, key) in task_state_style_mapping" :key="state">
                      <span v-if="key == line.state_override" :class="state.class_name">
                        {{ state.text }} <i :class="state.icon" />
                      </span>
                    </template>
                  </template>
                  <span v-else>未操作</span>
                  <small class="text-muted ms-auto">{{ utils.humanize(line.state_changed_at, DATE_SHORT_FORMAT) }}</small>
                </div>
              </li>
              <li v-if="(line instanceof Issue)">
                <a class="me-3" href="javascript:void(0)" @click="utils.redirect(`/projects/${project_id}/issues/${line.id}`)">{{ `#${line.id} ${line.title}` }}</a>
                <IssueStateBadge :issue_state="line.state" />
              </li>
            </template>
          </ul>
          <TaskDetailsAction
            v-if="current_phase_id == _.last(phase_infos).id"
            :key="current_task_upshot_info.id"
            v-model:is_task_pass="is_task_pass"
            :issue_templates="issue_templates"
            :phase_infos="phase_infos"
            :task_upshot_info="current_task_upshot_info"
            @updated="emit('updated', $event)" />
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
import { DATE_SHORT_FORMAT } from '@/constants'
import { computed, getCurrentInstance, nextTick, onUpdated, reactive, ref } from 'vue'

import { Validations } from "@/components/simple_form"
import * as utils from "@/lib/utils"
import { Issue, IssueTemplate, PhaseInfo, TaskInfo, TaskUpshot, TaskUpshotInfo } from '@/models'
import * as requests from '@/requests'
import { Modal } from 'bootstrap'
import _ from 'lodash'

import TaskDetailsAction from './TaskDetailsAction.vue'
import IssueStateBadge from '@/components/IssueStateBadge.vue'

const { proxy } = getCurrentInstance()

const props = withDefaults(defineProps<{
  phase_infos: PhaseInfo[]
  current_phase_id: number
  task_upshot_infos: TaskUpshotInfo[]
  issue_templates: IssueTemplate[]
  project_id: number
  plan_id: number
}>(), {
  platforms: () => [],
  phase_infos: () => [],
  task_upshot_infos: () => [],
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
const task_state_style_mapping = {
  "pass": {
    icon: "far fa-check",
    class_name: "text-success",
    text: "通过"
  },
  "failure": {
    icon: "far fa-times",
    class_name: "text-danger",
    text: "不通过"
  },
  "pending": {
    icon: "far fa-circle",
    class_name: "text-muted",
    text: "待测试"
  }
}

const current_content = computed(() => {
  return current_task_upshot_info.value.content ?? current_task_upshot_info.value?.test_case?.content
})

const time_lines = computed(() => {
  return _.orderBy([ ...task_info.value?.task_upshots ?? [], ...task_info.value?.issues ?? [] ], [ "created_at" ])
})

async function show(id: number) {
  mode.value = 'show'
  nextTick(() => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.show()
  })

  await getData(id)
  mode.value = 'shown'
}

async function getData(id: number) {
  current_task_upshot_info.value = _.find(props.task_upshot_infos, { id })
  task_info.value = await new requests.TaskInfoShow().setup(proxy, (req) => {
    req.interpolations.project_id = props.project_id
    req.interpolations.plan_id = props.plan_id
    req.interpolations.task_id = current_task_upshot_info.value.task.id
  }).perform()
}

async function hide() {
  mode.value = 'hide'

  nextTick(() => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.hide()
    mode.value = 'hidden'
  })
}

async function submitForm(event: InputEvent) {
  const formData = new FormData(event.currentTarget as HTMLFormElement)

  try {
    const task_upshot = await new requests.TaskUpshotContentUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = props.project_id
      req.interpolations.plan_id = props.plan_id
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

onUpdated(() => {
  if (textarea.value) {
    textarea.value.dispatchEvent(new Event('render'))
  }
})

defineExpose({
  show,
  hide
})
</script>
