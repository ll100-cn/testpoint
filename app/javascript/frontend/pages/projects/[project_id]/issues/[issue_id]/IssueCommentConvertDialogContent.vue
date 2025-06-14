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
import useRequestList from '@/lib/useRequestList'
import * as controls from '@/components/controls'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as q from '@/requests'
import { Comment, Issue, IssueBox } from "@/models"
import { ref } from "vue"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'

const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ Comment ]
}>()

const former = Former.build({
  comment_id: null as number | null
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_comment = await reqs.add(q.bug.issue_comments.Convert).setup(req => {
    req.interpolations.project_id = issue_box.value.issue.project_id
    req.interpolations.issue_id = issue_box.value.issue.id
    req.interpolations.comment_id = comment.value.id
  }).perform(this.form)

  emit("updated", a_comment)
  open.value = false
}

const issue_box = ref(null! as IssueBox)
const comment = ref(null! as Comment)
const loading = ref(true)

function reset(a_issue_box: IssueBox, a_comment: Comment) {
  issue_box.value = a_issue_box
  comment.value = a_comment

  former.form.comment_id = comment.value.comment_id

  loading.value = false
}

defineExpose({ reset })
</script>
