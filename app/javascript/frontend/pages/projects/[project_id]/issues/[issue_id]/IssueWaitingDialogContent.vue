<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>等待反馈</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <IssueCommentForm :former="former" :attachments="[]" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>确认</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import useRequestList from '@/lib/useRequestList'
import { Comment, IssueInfo } from "@/models"
import { getCurrentInstance, nextTick, ref } from "vue"
import IssueCommentForm from "./IssueCommentForm.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import Button from "$ui/button/Button.vue"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'

const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  created: [ IssueInfo, Comment ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()


const former = Former.build({
  content: "",
  attachments_params: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_comment = await reqs.add(q.bug.issue_comments.Create).setup(req => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(this.form)

  const a_issue_action = await reqs.add(q.bug.issue_actions.Create).setup(req => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform({ state: "waiting" })

  Object.assign(props.issue_info, a_issue_action.issue)
  props.issue_info.activities.push(...a_issue_action.activities)

  emit("created", props.issue_info, a_comment)
  open.value = false
}

const loading = ref(true)
async function reset() {
  loading.value = true

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({
  reset
})

</script>
