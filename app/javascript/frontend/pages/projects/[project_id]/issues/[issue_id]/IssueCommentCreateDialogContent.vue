<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>新增评论</DialogTitle>
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
import { Issue, IssueSurvey, Comment } from "@/models"
import { getCurrentInstance, ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'

const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

const emit = defineEmits<{
  created: [ Comment ]
}>()

const former = Former.build({
  content: "",
  attachments_params: []
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_comment = await new q.bug.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
  }).perform(this.form)

  emit("created", a_comment)
  open.value = false
}

const issue = ref(null as Issue)
const loading = ref(true)

function reset(a_issue: Issue) {
  issue.value = a_issue
  loading.value = false
}

defineExpose({ reset })
</script>
