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
import Button from "$ui/button/Button.vue"
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import type { IssueStateFrameEmits } from '@/components/IssueStateFrame'
import { useQueryLine } from '@/lib/useQueryLine'
import { IssueBox } from "@/models"
import * as q from '@/requests'
import { nextTick, ref } from "vue"
import IssueCommentForm from "./IssueCommentForm.vue"

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<IssueStateFrameEmits>()

const props = defineProps<{
  issue_box: IssueBox
}>()


const former = Former.build({
  content: "",
  attachments_params: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: create_comment_action } = line.request(q.bug.issue_comments.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

const { mutateAsync: create_issue_action_action } = line.request(q.bug.issue_actions.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_comment_box = await create_comment_action({
    interpolations: { project_id: props.issue_box.issue.project_id, issue_id: props.issue_box.issue.id },
    body: former.form
  })

  const a_issue_action = await create_issue_action_action({
    interpolations: { project_id: props.issue_box.issue.project_id, issue_id: props.issue_box.issue.id },
    body: { state: "waiting" }
  })

  Object.assign(props.issue_box.issue, a_issue_action.issue)
  props.issue_box.activities.push(...a_issue_action.activities)

  emit("created", props.issue_box, a_comment_box)
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
