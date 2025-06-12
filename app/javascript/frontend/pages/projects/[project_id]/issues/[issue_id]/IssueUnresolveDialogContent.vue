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
import { Issue, IssueBox } from "@/models"
import { ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'
import { useRouter } from "vue-router"
import { Former, GenericForm, GenericFormGroup } from '$ui/simple_form'
import { Button } from '$ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$ui/dialog'
import { useQueryLine } from '@/lib/useQueryLine'

const router = useRouter()
const line = useQueryLine()
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

const { mutateAsync: unresolve_issue_action } = line.request(q.bug.issues.InfoResolve(), (req, it) => {
  return it.useMutation(req.toMutationConfig(it))
})

former.perform = async function() {
  const a_issue_box = await unresolve_issue_action({
    interpolations: {
      project_id: props.issue_box.issue.project_id,
      issue_id: props.issue_box.issue.id
    },
    body: {
      action: 'unresolve',
      comment_attributes: former.form
    }
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
