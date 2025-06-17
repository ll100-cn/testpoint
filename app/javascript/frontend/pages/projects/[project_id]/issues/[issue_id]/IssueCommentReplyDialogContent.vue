<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>回复评论</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <blockquote class="blockquote">
        <PageContent :content="comment_box.comment.content" />
      </blockquote>

      <IssueCommentForm :former="former" :attachments="[]" />

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>提交</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/requests'
import { Attachment, Comment, type CommentBox, type IssueBox } from "@/models"
import _ from "lodash"
import { ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'
import PageContent from "@/components/PageContent.vue"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'
import type { IssueCommentFrameEmits } from '@/components/IssueCommentFrame'

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<IssueCommentFrameEmits>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const issue_box = ref(null! as IssueBox)

const { mutateAsync: create_comment_action } = line.request(q.bug.issue_comments.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_comment_box = await create_comment_action({
    interpolations: {
      project_id: issue_box.value.issue.project_id,
      issue_id: issue_box.value.issue.id
    },
    body: { ...former.form, parent_id: comment_box.value.comment.id }
  })

  emit("created", a_comment_box)
  open.value = false
}

const comment_box = ref(null! as CommentBox)
const loading = ref(true)

function attachmentChange($event: Attachment[]) {
  former.form.attachment_ids = _.map($event, 'id')
}

function reset(a_issue_box: IssueBox, a_comment_box: CommentBox) {
  issue_box.value = { ...a_issue_box }
  comment_box.value = { ...a_comment_box }

  loading.value = false
}

defineExpose({ reset })
</script>
