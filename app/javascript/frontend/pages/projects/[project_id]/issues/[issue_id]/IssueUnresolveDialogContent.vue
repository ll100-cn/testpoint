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
import * as q from '@/lib/requests'
import { IssueInfo } from "@/models"
import { getCurrentInstance, ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'
import { useRouter } from "vue-router"
import { Former, FormFactory, PresenterConfigProvider } from '$vendor/ui'
import { Button } from '$vendor/ui'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'

const router = useRouter()
const { proxy } = getCurrentInstance()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  content: "",
  attachment_params: []
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.perform = async function() {
  const a_issue_info = await new q.bug.IssueInfoReq.Resolve().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
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
