<template>
  <DialogContent v-if="!loading" class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>测试不通过</DialogTitle>
    </DialogHeader>

    <template v-if="addon == null">
      <TaskUpshotFailureType v-model="addon" :task_box="task_box" />
      <ActionerAlert :actioner="actioner" />

      <DialogFooter>
        <Button variant="secondary" type="button" @click.prevent="emit('switch', TaskUpshotInfoDialogContent, task_upshot_box)">取消</Button>
        <Button variant="destructive" type="button" @click.prevent="actioner.failTaskUpshot()">设置为不通过</Button>
      </DialogFooter>
    </template>

    <IssueForm preset="vertical" v-else-if="addon == 'new_issue'" v-bind="{ former: issue_former }" @submit.prevent="issue_former.perform()">
      <TaskUpshotFailureType v-model="addon" :task_box="task_box" />

      <hr>

      <FormErrorAlert />
      <ActionerAlert :actioner="actioner" />

      <IssueFormGroup path="issue_attributes.title" label="工单标题"><controls.String /></IssueFormGroup>
      <IssueFormGroup path="issue_attributes.content" label="工单内容"><controls.Markdown /></IssueFormGroup>

      <DialogFooter>
        <Button type="button" variant="secondary" @click.prevent="emit('switch', TaskUpshotInfoDialogContent, task_upshot_box)">取消</Button>
        <Button>提交</Button>
      </DialogFooter>
    </IssueForm>

    <template v-else>
      <CommentForm preset="vertical" v-bind="{ former: comment_former }" @submit.prevent="comment_former.perform()">
        <TaskUpshotFailureType v-model="addon" :task_box="task_box" />

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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { Category, IssueTemplate, IssueTemplateBox, IssueTemplatePage, Member, PhaseInfo, Plan, PlanBox, TaskBox, TaskUpshot, TaskUpshotBox } from '@/models'
import { usePageStore, useSessionStore } from '@/store'
import { type Component, computed, getCurrentInstance, nextTick, ref } from 'vue'
import TaskUpshotInfoDialogContent from "./TaskUpshotInfoDialogContent.vue"
import TaskUpshotFailureType, { type ModalValue as AddonType } from "./TaskUpshotFailureType.vue"
import { Actioner } from "@/components/Actioner"
import IssueCommentForm from "../issues/[issue_id]/IssueCommentForm.vue"
import ActionerAlert from "@/components/ActionerAlert.vue"
import { Former as NewFormer, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'

const reqs = useRequestList()
const page = usePageStore()
const session = useSessionStore()

const props = defineProps<{
  plan_box: PlanBox
}>()

const emit = defineEmits<{
  updated: [task_upshot: TaskUpshot]
  switch: [Component, TaskUpshotBox]
}>()

const addon = ref(null as AddonType)
const task_upshot_box = ref(null! as TaskUpshotBox)
const task_box = ref(null! as TaskBox)
const issue_template_page = ref(null! as IssueTemplatePage<IssueTemplateBox>)

const issue_former = NewFormer.build({
  from_task_id: null as number | null,
  issue_attributes: {
    title: null as string | null,
    content: null as string | null,
  },
})

const IssueForm = GenericForm<typeof issue_former.form>
const IssueFormGroup = GenericFormGroup<typeof issue_former.form>

issue_former.doPerform = async function() {
  await reqs.add(q.bug.issues.Create).setup(req => {
    req.interpolations.project_id = props.plan_box.plan.project_id
  }).perform(this.form)

  await actioner.failTaskUpshot()
}

const comment_issue = computed(() => {
  return task_box.value.issues?.find(it => it.id === addon.value)
})

const comment_former = NewFormer.build({
  content: "",
  attachments_params: []
})

const CommentForm = GenericForm<typeof comment_former.form>
const CommentFormGroup = GenericFormGroup<typeof comment_former.form>

comment_former.doPerform = async function() {
  await reqs.add(q.bug.issue_comments.Create).setup(req => {
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
    const a_task_upshot_box = await reqs.add(q.test.task_upshot_states.Update).setup(req => {
      req.interpolations.project_id = props.plan_box.plan.project_id
      req.interpolations.plan_id = props.plan_box.plan.id
      req.interpolations.task_id = task_box.value.task.id
      req.interpolations.upshot_id = task_upshot_box.value.task_upshot.id
    }).perform({
      task_upshot: {
        state_override: 'failure',
      }
    })

    Object.assign(task_upshot_box.value.task_upshot, a_task_upshot_box.task_upshot)
    emit('switch', TaskUpshotInfoDialogContent, task_upshot_box.value)
  })
}

const loading = ref(true)
async function reset(a_task_upshot_box: TaskUpshotBox, a_task_box: TaskBox) {
  loading.value = true

  task_upshot_box.value = a_task_upshot_box
  task_box.value = a_task_box
  addon.value = null

  reqs.add(q.project.issue_templates.List).setup(req => {
    req.interpolations.project_id = props.plan_box.plan.project_id
  }).waitFor(issue_template_page)
  await reqs.performAll()

  issue_former.form.issue_attributes.title = `「${props.plan_box.plan.platform.name}」 ${task_upshot_box.value.test_case?.title}`
  issue_former.form.issue_attributes.content = `\n预期效果:\n${task_upshot_box.value.task_upshot.content ?? task_upshot_box.value.test_case?.content}\n\n实际效果:\n`
  issue_former.form.from_task_id = task_upshot_box.value.task!.id

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({ reset })
</script>
