<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>回复评论</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <blockquote class="blockquote">
        <PageContent :content="comment.content" />
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
import * as q from '@/lib/requests'
import { Attachment, Comment, Issue } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'
import PageContent from "@/components/PageContent.vue"
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
  attachment_ids: []
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_comment = await new q.bug.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
  }).perform({ ...this.form, comment_id: comment.value.id })

  emit("created", a_comment)
  open.value = false
}

const issue = ref(null as Issue)
const comment = ref(null as Comment)
const loading = ref(true)

function attachmentChange($event: Attachment[]) {
  former.form.attachment_ids = _.map($event, 'id')
}

function reset(a_issue: Issue, a_comment: Comment) {
  issue.value = a_issue
  comment.value = a_comment

  loading.value = false
}

defineExpose({ reset })
</script>
