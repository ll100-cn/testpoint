<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
      <div v-if="current_task_upshot_info" class="modal-content">
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
            <li v-for="task in current_task_upshot_info.task_stats_by_phase" :key="task.id" :style="{ listStyleType: current_phase_id == task.phase_id ? 'disclosure-closed' : 'initial'}">
              <div class="d-flex align-items-center">
                <span class="me-2">{{ _.find(phase_infos, { id: task.phase_id }).title }}</span>
                <template v-if="task.state_override">
                  <template v-for="(state, key) in task_state_style_mapping" :key="state">
                    <span v-if="key == task.state_override" :class="state.class_name">
                      {{ state.text }} <i :class="state.icon" />
                    </span>
                  </template>
                </template>
                <span v-else>未操作</span>
                <small class="text-muted ms-auto">{{ utils.humanize(task.state_changed_at, DATE_SHORT_FORMAT) }}</small>
              </div>
            </li>
          </ul>
          <template v-if="current_phase_id == _.last(phase_infos).id">
            <hr>
            <div class="x-actions">
              <SubmitButton
                v-if="_.includes(['pass', 'failure'], current_task_upshot_info.state_override)"
                type="primary"
                :func="() => updateStateOverride('pending')"
                submit_text="撤销测试结果" />
              <SubmitButton v-else type="success" :func="() => updateStateOverride('pass')" submit_text="全部通过" />
              <SubmitButton disabled type="danger" submit_text="不通过" />
            </div>
          </template>
        </div>
      </div>
      <div v-else class="modal-content">
        <div class="d-flex justify-content-center">
          <div class="spinner-border p-5 m-5" role="status" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { DATE_SHORT_FORMAT } from '@/constants'
import { computed, getCurrentInstance, nextTick, onUpdated, reactive, ref } from 'vue'

import { Validations } from "@/components/simple_form"
import * as utils from "@/lib/utils"
import { PhaseInfo, Platform, TaskUpshot, TaskUpshotInfo } from '@/models'
import * as requests from '@/requests'
import { Modal } from 'bootstrap'
import _ from 'lodash'

import SubmitButton from "@/components/SubmitButton.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()

const props = withDefaults(defineProps<{
  // platforms: Platform[]
  phase_infos: PhaseInfo[]
  current_phase_id: number
  task_upshot_infos: TaskUpshotInfo[]
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
const mode = ref('show')
const project_id = _.toNumber(route.params.project_id)
const plan_id = _.toNumber(route.params.id)

const current_task_upshot_info_id = ref()
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
const current_task_upshot_info = computed(() => {
  return _.find(props.task_upshot_infos, { id: current_task_upshot_info_id.value })
})

const current_content = computed(() => {
  return current_task_upshot_info.value.content ?? current_task_upshot_info.value?.test_case?.content
})

async function show(id: number) {
  current_task_upshot_info_id.value = id
  mode.value = 'show'

  nextTick(() => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.show()
  })
}

async function hidden() {
  mode.value = 'hide'

  nextTick(() => {
    const $modal = ref(Modal.getOrCreateInstance(modal.value))
    $modal.value.hide()
  })
}

async function updateStateOverride(state_override: "pass" | "pending" | "failure") {
  validations.clear()

  try {
    const task_upshot = await new requests.TaskUpshotStateUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.plan_id = plan_id
      req.interpolations.task_id = current_task_upshot_info.value.task.id
      req.interpolations.upshot_id = current_task_upshot_info.value.id
      req.query = {
        task_upshot: {
          state_override
        }
      }
    }).perform()
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

async function submitForm(event: InputEvent) {
  const formData = new FormData(event.currentTarget as HTMLFormElement)

  try {
    const task_upshot = await new requests.TaskUpshotContentUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.plan_id = plan_id
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
  hidden
})
</script>
