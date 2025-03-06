<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>关联</DialogTitle>
    </DialogHeader>

    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      <FormErrorAlert />

      <div class="space-y-3">
        <FormGroup path="comment_id" label="评论 ID" hint="ID 为空则是评论">
          <controls.number />
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
import { Button, Former, FormFactory } from '@/ui'
import * as controls from '@/components/controls'
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import * as q from '@/lib/requests'
import { Comment, Issue } from "@/models"
import { getCurrentInstance, ref } from "vue"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'

const proxy = getCurrentInstance()!.proxy as any
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ Comment ]
}>()

const former = Former.build({
  comment_id: null as number | null
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_comment = await new q.bug.issue_comments.Convert().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
    req.interpolations.comment_id = comment.value.id
  }).perform(this.form)

  emit("updated", a_comment)
  open.value = false
}

const issue = ref(null as Issue)
const comment = ref(null as Comment)
const loading = ref(true)

function reset(a_issue: Issue, a_comment: Comment) {
  issue.value = a_issue
  comment.value = a_comment

  former.form.comment_id = comment.value.comment_id

  loading.value = false
}

defineExpose({ reset })
</script>
