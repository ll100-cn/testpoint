<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>新增评论</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <IssueCommentForm :former="former" :attachments="[]" />
      <DialogFooter>
        <DialogClose as-child><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>提交</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import { Button } from '$ui/button'
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '$ui/dialog'
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import type { IssueCommentFrameEmits } from '@/components/IssueCommentFrame'
import { useQueryLine } from '@/lib/useQueryLine'
import { IssueBox } from "@/models"
import * as q from '@/requests'
import { ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'

const line = useQueryLine()
const open = defineModel('open')

const emit = defineEmits<IssueCommentFrameEmits>()

const former = Former.build({
  content: "",
  attachments_params: []
})

const Form = GenericForm<typeof former.form>
const issue_box = ref(null! as IssueBox)
const loading = ref(true)

const { mutateAsync: create_comment_action } = line.request(q.bug.issue_comments.Create(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.doPerform = async function() {
  const a_comment_box = await create_comment_action({
    interpolations: { project_id: issue_box.value.issue.project_id, issue_id: issue_box.value.issue.id },
    body: former.form,
  })

  emit("created", a_comment_box)
  open.value = false
}

function reset(a_issue_box: IssueBox) {
  issue_box.value = a_issue_box
  loading.value = false
}

defineExpose({ reset })
</script>
