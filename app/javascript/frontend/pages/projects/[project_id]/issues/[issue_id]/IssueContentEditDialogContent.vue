<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>修改内容</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <IssueCommentForm :former="former" :attachments="issue_box.attachments" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>提交修改</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import * as q from '@/requests'
import { Attachment, Issue, IssueBox } from '@/models'
import { ref } from 'vue'
import IssueCommentForm from './IssueCommentForm.vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [IssueBox]
}>()

const issue_box = ref(null! as IssueBox)

const former = Former.build({
  content: '',
  attachments_params: [] as Partial<Attachment>[]
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_issue_body_action } = line.request(q.bug.issue_bodies.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_issue_body = await update_issue_body_action({
    interpolations: {
      project_id: issue_box.value.issue.project_id,
      issue_id: issue_box.value.issue.id
    },
    body: former.form
  })

  Object.assign(issue_box.value.issue, a_issue_body.issue)
  issue_box.value.attachments = a_issue_body.attachments

  emit("updated", issue_box.value)
  open.value = false
}

const loading = ref(true)
function reset(a_issue_box: IssueBox) {
  loading.value = true

  issue_box.value = a_issue_box
  former.form.content = a_issue_box.issue.content
  former.form.attachments_params = a_issue_box.attachments.map(it => {
    return { id: it.id }
  })

  loading.value = false
}

defineExpose({ reset })

</script>
