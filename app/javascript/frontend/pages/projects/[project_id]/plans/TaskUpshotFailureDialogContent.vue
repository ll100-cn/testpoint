<template>
  <DialogContent v-if="!loading" class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>测试不通过</DialogTitle>
    </DialogHeader>

    <template v-if="addon == null">
      <TaskUpshotFailureType v-model="addon" :task_info="task_info" />
      <ActionerAlert :actioner="actioner" />

      <DialogFooter>
        <Button variant="secondary" type="button" @click.prevent="emit('switch', TaskUpshotInfoDialogContent, task_upshot_info)">取消</Button>
        <Button variant="destructive" type="button" @click.prevent="actioner.failTaskUpshot()">设置为不通过</Button>
      </DialogFooter>
    </template>

    <IssueForm preset="vertical" v-else-if="addon == 'new_issue'" v-bind="{ former: issue_former }" @submit.prevent="issue_former.perform()">
      <TaskUpshotFailureType v-model="addon" :task_info="task_info" />

      <hr>

      <FormErrorAlert />
      <ActionerAlert :actioner="actioner" />

      <IssueFormGroup path="issue_attributes.title" label="工单标题"><newControls.string /></IssueFormGroup>
      <IssueFormGroup path="issue_attributes.content" label="工单内容"><newControls.markdown /></IssueFormGroup>

      <DialogFooter>
        <Button type="button" variant="secondary" @click.prevent="emit('switch', TaskUpshotInfoDialogContent, task_upshot_info)">取消</Button>
        <Button>提交</Button>
      </DialogFooter>
    </IssueForm>

    <template v-else>
      <CommentForm preset="vertical" v-bind="{ former: comment_former }" @submit.prevent="comment_former.perform()">
        <TaskUpshotFailureType v-model="addon" :task_info="task_info" />

        <hr>

        <FormErrorAlert />
        <ActionerAlert :actioner="actioner" />

        <IssueCommentForm :former="comment_former" :attachments="[]" />

        <DialogFooter>
          <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
          <Button>提交</Button>
        </DialogFooter>
      </CommentForm>
    </template>
  </DialogContent>
</template>

<script setup lang="ts">
import { controls, layouts } from "@/components/simple_form"
import Former from '@/components/simple_form/Former'
import * as q from '@/requests'
import { Category, IssueTemplate, Member, PhaseInfo, Plan, PlanInfo, TaskInfo, TaskUpshot, TaskUpshotInfo } from '@/models'
import { usePageStore } from '@/store'
import { type Component, computed, getCurrentInstance, nextTick, ref } from 'vue'
import TaskUpshotInfoDialogContent from "./TaskUpshotInfoDialogContent.vue"
import TaskUpshotFailureType, { type ModalValue as AddonType } from "./TaskUpshotFailureType.vue"
import { Actioner } from "@/components/Actioner"
import IssueCommentForm from "../issues/[issue_id]/IssueCommentForm.vue"
import ActionerAlert from "@/components/ActionerAlert.vue"
import { Former as NewFormer, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import * as newControls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'

const proxy = getCurrentInstance()!.proxy as any
const page = usePageStore()

const props = defineProps<{
  plan_info: PlanInfo
}>()

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
  switch: [Component, TaskUpshotInfo]
}>()

const addon = ref(null as AddonType)
const task_upshot_info = ref(null! as TaskUpshotInfo)
const task_info = ref(null! as TaskInfo)
const members = ref([] as Member[])
const categories = ref([] as Category[])
const issue_templates = ref([] as IssueTemplate[])

const issue_former = NewFormer.build({
  from_task_id: null,
  issue_attributes: {
    title: null,
    content: null,
  },
})

const { Form: IssueForm, FormGroup: IssueFormGroup } = FormFactory<typeof issue_former.form>()

issue_former.doPerform = async function() {
  await new q.bug.IssueReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.plan_info.project_id
  }).perform(this.form)

  await actioner.failTaskUpshot()
}

const comment_issue = computed(() => {
  return task_info.value.issues.find(it => it.id === addon.value)
})

const comment_former = NewFormer.build({
  content: "",
  attachments_params: []
})

const { Form: CommentForm, FormGroup: CommentFormGroup } = FormFactory<typeof comment_former.form>()

comment_former.doPerform = async function() {
  await new q.bug.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = comment_issue.value!.project_id
    req.interpolations.issue_id = comment_issue.value!.id
  }).perform(this.form)

  await actioner.failTaskUpshot()
}

const actioner = Actioner.build<{
  failTaskUpshot: () => Promise<void>
}>()

actioner.failTaskUpshot = async function() {
  this.perform(async function() {
    console.log("-------znmsb--------")
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
    emit('switch', TaskUpshotInfoDialogContent, task_upshot_info.value)
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

  members.value = await page.inProject()!.request(q.project.MemberInfoReq.List).setup(proxy).perform()
  categories.value = await page.inProject()!.request(q.project.CategoryReq.List).setup(proxy).perform()

  issue_former.form.issue_attributes.title = `「${props.plan_info.platform.name}」 ${task_upshot_info.value.test_case.title}`
  issue_former.form.issue_attributes.content = `\n预期效果:\n${task_upshot_info.value.content ?? task_upshot_info.value.test_case.content}\n\n实际效果:\n`
  issue_former.form.from_task_id = task_upshot_info.value.task.id

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>
