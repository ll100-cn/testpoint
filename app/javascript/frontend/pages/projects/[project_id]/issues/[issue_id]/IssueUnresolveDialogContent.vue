<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>请在下方详细注明未解决的原因</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
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
import useRequestList from '@/lib/useRequestList'
import { Issue, IssueBox } from "@/models"
import { ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'
import { useRouter } from "vue-router"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'

const router = useRouter()
const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [IssueBox]
}>()

const props = defineProps<{
  issue_box: IssueBox
}>()

const former = Former.build({
  content: "",
  attachment_params: []
})

const Form = GenericForm<typeof former.form>
const FormGroup = GenericFormGroup<typeof former.form>

former.perform = async function() {
  const a_issue_box = await reqs.add(q.bug.issues.InfoResolve).setup(req => {
    req.interpolations.project_id = props.issue_box.issue.project_id
    req.interpolations.issue_id = props.issue_box.issue.id
  }).perform({
    action: 'unresolve',
    comment_attributes: this.form
  })

  open.value = false
  router.go(0)
}

const loading = ref(true)

function reset() {
  loading.value = false
}

defineExpose({ reset })
</script>
