<template>
  <DialogContent class="max-w-4xl">
    <DialogHeader>
      <DialogTitle>确认</DialogTitle>
    </DialogHeader>
    <Form preset="vertical" v-bind="{ former }" @submit.prevent="former.perform()" v-if="!loading">
      确认后将归档该问题, 无法编辑, 是否确认问题已解决？

      <DialogFooter>
        <DialogClose><Button variant="secondary" type="button">取消</Button></DialogClose>
        <Button>确认</Button>
      </DialogFooter>
    </Form>
  </DialogContent>
</template>

<script setup lang="ts">
import * as q from '@/lib/requests'
import useRequestList from '@bbb/useRequestList'
import { IssueInfo } from "@/models"
import { getCurrentInstance, ref } from "vue"
import { Former, FormFactory, PresenterConfigProvider } from '@/ui'
import { Button } from '@/ui'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/ui'

const reqs = useRequestList()
const open = defineModel('open')

const emit = defineEmits<{
  updated: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

const { Form, FormGroup } = FormFactory<typeof former.form>()

former.doPerform = async function() {
  const a_issue_info = await reqs.add(q.bug.issues.InfoResolve).setup(req => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform({
    action: 'resolve',
    comment_attributes: this.form
  })

  emit("updated", a_issue_info)
  open.value = false
}

const loading = ref(true)

function reset() {
  loading.value = false
}

function confirm() {
  former.perform()
}

defineExpose({ reset, confirm })
</script>
