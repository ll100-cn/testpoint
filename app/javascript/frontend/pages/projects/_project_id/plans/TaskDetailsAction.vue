<template>
  <hr>
  <div v-if="is_task_pass" class="x-actions">
    <SubmitButton
      v-if="_.includes(['pass', 'failure'], task_upshot_info.state_override)"
      type="primary"
      :func="() => updateStateOverride('pending')"
      submit_text="撤销测试结果" />
    <SubmitButton v-else type="success" :func="() => updateStateOverride('pass')" submit_text="全部通过" />
    <SubmitButton type="danger" submit_text="不通过" @click="emit('update:is_task_pass', true)" />
  </div>
  <div v-else>
    <h5>补充工单详情</h5>
    <form>
      <div class="border rounded p-3 mb-3">
        <IssueForm
          :issue_templates="issue_templates"
          :validations="validations"
          :form="form"
          :plan_id="plan_id"
          :project_id="project_id" />
      </div>
      <div class="x-actions">
        <SubmitButton submit_text="提交" :func="onSubmit" />
        <SubmitButton submit_text="取消" type="secondary" @click="emit('update:is_task_pass', false)" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, reactive, ref, watch } from 'vue'
import { useRoute } from "vue-router"
import { Validations } from "@/components/simple_form"

import { IssueTemplate, PhaseInfo, TaskUpshot, TaskUpshotInfo } from '@/models'
import * as requests from '@/requests'
import _ from 'lodash'

import IssueForm from "@/components/IssueForm.vue"
import SubmitButton from "@/components/SubmitButton.vue"

const { proxy } = getCurrentInstance()
const route = useRoute()

const props = withDefaults(defineProps<{
  // platforms: Platform[]
  phase_infos: PhaseInfo[]
  task_upshot_info: TaskUpshotInfo
  issue_templates: IssueTemplate[]
  is_task_pass: boolean
}>(), {
  platforms: () => [],
  phase_infos: () => [],
  is_task_pass: false
})

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
  "update:is_task_pass": [is_task_pass: boolean]
}>()

const form = ref({
  issue_template_id: "",
  title: "测试标题",
  content: buildContent(props.task_upshot_info.content ?? props.task_upshot_info.test_case.content),
  state: "",
  assignee_id: "",
})

const validations = reactive<Validations>(new Validations())
const project_id = _.toNumber(route.params.project_id)
const plan_id = _.toNumber(route.params.id)

function buildContent(content: string) {
  return `\n预期效果:\n${content}\n\n实际效果:\n`
}

async function updateStateOverride(state_override: "pass" | "pending" | "failure") {
  validations.clear()

  try {
    const task_upshot = await new requests.TaskUpshotStateUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = project_id
      req.interpolations.plan_id = plan_id
      req.interpolations.task_id = props.task_upshot_info.task.id
      req.interpolations.upshot_id = props.task_upshot_info.id
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

async function onSubmit() {
  validations.clear()
  console.log(form.value)
  // const form_data = new FormData(event.currentTarget as HTMLFormElement)
  try {
    // await new requests.TestCaseUpdate().setup(proxy, (req) => {
    // }).perform(form)
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}
</script>
