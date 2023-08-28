<template>
  <div v-if="!is_task_pass" class="x-actions">
    <SubmitButton
      v-if="_.includes(['pass', 'failure'], task_upshot_info.state_override)"
      type="primary"
      :func="() => updateStateOverride('pending')"
      submit_text="撤销测试结果" />
    <template v-else>
      <SubmitButton type="success" :func="() => updateStateOverride('pass')" submit_text="全部通过" />
      <SubmitButton type="danger" submit_text="不通过" @click="emit('update:is_task_pass', true)" />
    </template>
  </div>
  <div v-else>
    <h5>补充工单详情</h5>

    <IssueForm
      :issue_templates="issue_templates"
      :validations="validations"
      :members="members"
      :categories="categories"
      :form="form"
      :plan_id="plan.id"
      :project_id="project_id" />

    <div class="x-actions">
      <SubmitButton submit_text="提交" :func="onSubmit" />
      <SubmitButton submit_text="取消" type="secondary" @click="emit('update:is_task_pass', false)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validations } from "@/components/simple_form"
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRoute } from "vue-router"

import { IssueTemplate, PhaseInfo, Plan, TaskUpshot, TaskUpshotInfo } from '@/models'
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
  project_id: number
  plan: Plan
}>(), {
  platforms: () => [],
  phase_infos: () => [],
  is_task_pass: false
})

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
  "update:is_task_pass": [is_task_pass: boolean]
}>()

const members = ref(await new requests.MemberList().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform())

const categories = ref(await new requests.CategoryList().setup(proxy, (req) => {
  req.interpolations.project_id = props.project_id
}).perform())

const validations = reactive<Validations>(new Validations())

const form = ref({
  // issue_template_id: "",
  title: `【${props.plan.platform.name} 测试失败】${props.task_upshot_info.test_case.title}`,
  content: buildContent(props.task_upshot_info.content ?? props.task_upshot_info.test_case.content),
  state: "confirmed",
  assignee_id: "",
  from_task_id: props.task_upshot_info.task.id,
  category_id: _.find(categories.value, { 'default_as_test_failure': true })?.id
})
const _form = _.cloneDeep(form.value)

function resetForm() {
  form.value = _form
}

function buildContent(content: string) {
  return `\n预期效果:\n${content}\n\n实际效果:\n`
}

async function updateStateOverride(state_override: "pass" | "pending" | "failure") {
  validations.clear()

  try {
    const task_upshot = await new requests.TaskUpshotStateUpdate().setup(proxy, (req) => {
      req.interpolations.project_id = props.project_id
      req.interpolations.plan_id = props.plan.id
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

  try {
    const issue = await new requests.IssueCreate().setup(proxy, (req) => {
      req.interpolations.project_id = props.project_id
    }).perform(form.value)
    if (issue) {
      emit('update:is_task_pass', false)
      emit('updated', props.task_upshot_info)
      resetForm()
    }
  } catch (err) {
    if (validations.handleError(err)) {
      return
    }

    throw err
  }
}

</script>
