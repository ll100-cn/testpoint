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
import useRequestList from '@/lib/useRequestList'
import { Comment, CommentBox, IssueBox } from "@/models"
import * as q from '@/requests'
import { ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'

const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  created: [ CommentBox ]
}>()

const former = Former.build({
  content: "",
  attachments_params: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>
const issue_box = ref(null! as IssueBox)
const loading = ref(true)

former.doPerform = async function() {
  console.log('issue_box project_id is', issue_box.value.issue)
  console.log('issue_box project_id is', issue_box.value.issue.project_id)
  const a_comment_box = await reqs.add(q.bug.issue_comments.Create).setup(req => {
    req.interpolations.project_id = issue_box.value.issue.project_id
    req.interpolations.issue_id = issue_box.value.issue.id
  }).perform(this.form)

  emit("created", a_comment_box)
  open.value = false
}

function reset(a_issue_box: IssueBox) {
  console.log("a_issue_box is", a_issue_box)
  issue_box.value = a_issue_box
  loading.value = false
}

defineExpose({ reset })
</script>
