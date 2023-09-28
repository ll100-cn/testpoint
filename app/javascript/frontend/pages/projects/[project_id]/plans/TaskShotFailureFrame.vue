<template>
  <div ref="el" class="modal-dialog modal-lg" v-if="!loading" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">测试不通过</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <template v-if="addon == null">
        <div class="modal-body">
          <TaskUpshotFailureType v-model="addon" :task_info="task_info" />

          <ActionerAlert :actioner="actioner" />
        </div>

        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" @click.prevent="emit('switch', TaskUpshotInfoFrame, task_upshot_info)">取消</button>
          <a class="btn btn-danger" href="#" @click.prevent="actioner.failTaskUpshot">设置为不通过</a>
        </div>
      </template>

      <layouts.form_vertical v-else-if="addon == 'new_issue'" v-bind="{ former: issue_former }" @submit.prevent="issue_former.submit">
        <div class="modal-body">
          <TaskUpshotFailureType v-model="addon" :task_info="task_info" />

          <hr>

          <FormErrorAlert />
          <ActionerAlert :actioner="actioner" />

          <layouts.group code="issue_attributes.title" label="工单标题"><controls.string /></layouts.group>
          <layouts.group code="issue_attributes.content" label="工单内容"><controls.markdown /></layouts.group>
        </div>

        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" @click.prevent="emit('switch', TaskUpshotInfoFrame, task_upshot_info)">取消</button>
          <layouts.submit>提交</layouts.submit>
        </div>
      </layouts.form_vertical>

      <template v-else>
        <layouts.form_vertical v-bind="{ former: comment_former }" @submit.prevent="comment_former.submit">
          <div class="modal-body">
            <TaskUpshotFailureType v-model="addon" :task_info="task_info" />

            <hr>

            <FormErrorAlert />
            <ActionerAlert :actioner="actioner" />

            <IssueCommentForm :former="comment_former" :attachments="[]" />
          </div>
          <div class="modal-footer x-spacer2">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <layouts.submit>提交</layouts.submit>
          </div>
        </layouts.form_vertical>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { controls, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/lib/requests'
import { Category, IssueTemplate, Member, PhaseInfo, Plan, PlanInfo, TaskInfo, TaskUpshot, TaskUpshotInfo } from '@/models'
import { usePageStore } from '@/store'
import { Component, computed, getCurrentInstance, nextTick, ref } from 'vue'
import TaskUpshotInfoFrame from "./TaskUpshotInfoFrame.vue"
import TaskUpshotFailureType, { ModalValue as AddonType } from "./TaskUpshotFailureType.vue"
import { Actioner } from "@/components/Actioner"
import IssueCommentForm from "../issues/[issue_id]/IssueCommentForm.vue"
import ActionerAlert from "@/components/ActionerAlert.vue"

const { proxy } = getCurrentInstance()
const page = usePageStore()

const props = defineProps<{
  current_phase_id: number
  plan_info: PlanInfo
}>()

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
  switch: [Component, TaskUpshotInfo]
}>()

const addon = ref(null as AddonType)
const task_upshot_info = ref(null as TaskUpshotInfo)
const task_info = ref(null as TaskInfo)
const members = ref([] as Member[])
const categories = ref([] as Category[])
const issue_templates = ref([] as IssueTemplate[])

const issue_former = Former.build({
  from_task_id: null,
  issue_attributes: {
    title: null,
    content: null,
  },
})

issue_former.perform = async function() {
  await new q.bug.IssueReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.plan_info.project_id
  }).perform(this.form)

  await actioner.failTaskUpshot()
}

const comment_issue = computed(() => {
  return task_info.value.issues.find(it => it.id === addon.value)
})

const comment_former = Former.build({
  content: "",
  attachments_params: []
})

comment_former.perform = async function() {
  await new q.bug.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = comment_issue.value.project_id
    req.interpolations.issue_id = comment_issue.value.id
  }).perform(this.form)

  await actioner.failTaskUpshot()
}

const actioner = Actioner.build<{
  failTaskUpshot: () => Promise<void>
}>()

actioner.failTaskUpshot = async function() {
  this.perform(async function() {
    const a_task_upshot = await new q.test.TaskUpshotStateReq.Update().setup(proxy, (req) => {
      req.interpolations.project_id = props.plan_info.project_id
      req.interpolations.plan_id = props.plan_info.id
      req.interpolations.task_id = task_info.value.id
      req.interpolations.upshot_id = task_upshot_info.value.id
    }).perform({
      task_upshot: {
        state_override: 'failure',
      }
    })

    Object.assign(task_upshot_info.value, a_task_upshot)
    emit('switch', TaskUpshotInfoFrame, task_upshot_info.value)
  })
}

const loading = ref(true)
async function reset(a_task_upshot_info: TaskUpshotInfo, a_task_info: TaskInfo) {
  loading.value = true

  task_upshot_info.value = a_task_upshot_info
  task_info.value = a_task_info
  addon.value = null

  issue_templates.value = await new q.project.IssueTemplateReq.List().setup(proxy, (req) => {
    req.interpolations.project_id = props.plan_info.project_id
  }).perform()

  members.value = await page.inProject().request(q.project.MemberReq.List).setup(proxy).perform()
  categories.value = await page.inProject().request(q.project.CategoryReq.List).setup(proxy).perform()

  issue_former.form.issue_attributes.title = `【${props.plan_info.platform.name} 测试失败】${task_upshot_info.value.test_case.title}`
  issue_former.form.issue_attributes.content = `\n预期效果:\n${task_upshot_info.value.content ?? task_upshot_info.value.test_case.content}\n\n实际效果:\n`
  issue_former.form.from_task_id = task_upshot_info.value.task.id

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>
