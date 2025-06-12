<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>修改评论</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <IssueCommentForm :former="former" :attachments="comment_box.comment.attachments" />

      <DialogFooter>
        <DialogClose><Button type="button" variant="secondary">取消</Button></DialogClose>
        <Button>提交</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Attachment, CommentBox, IssueBox } from "@/models"
import * as q from '@/requests'
import _ from "lodash"
import { ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'
import { useQueryLine } from '@/lib/useQueryLine'

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ CommentBox ]
}>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: update_comment_action } = line.request(q.bug.issue_comments.Update(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_comment = await update_comment_action({
    interpolations: {
      project_id: issue_box.value.issue.project_id,
      issue_id: issue_box.value.issue.id,
      comment_id: comment_box.value.comment.id
    },
    body: former.form
  })

  emit("updated", a_comment)
  open.value = false
}

const issue_box = ref(null! as IssueBox)
const comment_box = ref(null! as CommentBox)
const loading = ref(true)

function attachmentChange($event: Attachment[]) {
  former.form.attachment_ids = _.map($event, 'id')
}

function reset(a_issue_box: IssueBox, a_comment_box: CommentBox) {
  console.log("reset", a_issue_box, a_comment_box)
  issue_box.value = a_issue_box
  comment_box.value = a_comment_box

  former.form.content = a_comment_box.comment.content
  former.form.attachment_ids = a_comment_box.comment.attachments.map(it => it.id)
  loading.value = false
}

defineExpose({ reset })
</script>
