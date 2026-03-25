<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>关联</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="comment_id" label="评论 ID" hint="ID 为空则是评论">
          <controls.Number />
        </FormGroup>
      </div>

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>提交</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import * as controls from '@/components/controls'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as q from '@/requests'
import { Comment, Issue, type IssueBox } from "@/models"
import { ref } from "vue"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'
import type { IssueCommentFrameEmits } from '@/components/IssueCommentFrame'

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<IssueCommentFrameEmits>()

const former = Former.build({
  comment_id: null as number | null
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

const { mutateAsync: convert_comment_action } = line.request(q.bug.issue_comments.Convert(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_comment_box = await convert_comment_action({
    interpolations: {
      project_id: issue_box.value.issue.projectId,
      issue_id: issue_box.value.issue.id,
      comment_id: comment.value.id
    },
    body: former.form
  })

  emit("updated", a_comment_box)
  open.value = false
}

const issue_box = ref(null! as IssueBox)
const comment = ref(null! as Comment)
const loading = ref(true)

function reset(a_issue_box: IssueBox, a_comment: Comment) {
  issue_box.value = { ...a_issue_box }
  comment.value = a_comment

  former.form.comment_id = comment.value.commentId

  loading.value = false
}

defineExpose({ reset })
</script>
