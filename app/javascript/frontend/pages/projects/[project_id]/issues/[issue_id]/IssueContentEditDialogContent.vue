<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>修改内容</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <IssueCommentForm :former="former" :attachments="issue_info.attachments" />

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
import useRequestList from '@/lib/useRequestList'
import * as q from '@/requests'
import { Attachment, IssueInfo } from '@/models'
import { ref } from 'vue'
import IssueCommentForm from './IssueCommentForm.vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'

const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [IssueInfo]
}>()

const issue_info = ref(null! as IssueInfo)

const former = Former.build({
  content: '',
  attachments_params: [] as Partial<Attachment>[]
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.doPerform = async function() {
  const a_issue_body = await reqs.add(q.bug.issue_bodies.Update).setup(req => {
    req.interpolations.project_id = issue_info.value.project_id
    req.interpolations.issue_id = issue_info.value.id
  }).perform(this.form)

  Object.assign(issue_info.value, a_issue_body.issue)
  issue_info.value.attachments = a_issue_body.attachments

  emit("updated", issue_info.value)
  open.value = false
}

const loading = ref(true)
function reset(a_issue_info: IssueInfo) {
  loading.value = true

  issue_info.value = a_issue_info
  former.form.content = a_issue_info.content
  former.form.attachments_params = a_issue_info.attachments.map(it => {
    return { id: it.id }
  })

  loading.value = false
}

defineExpose({ reset })

</script>
