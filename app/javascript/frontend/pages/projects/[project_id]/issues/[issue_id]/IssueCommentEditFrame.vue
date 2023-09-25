<template>
  <div ref="el" class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">修改评论</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">
          <IssueCommentForm :former="former" :attachments="comment.attachments" />
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>提交</layouts.submit>
        </div>
      </layouts.form_vertical>
    </div>
  </div>
</template>

<script setup lang="ts">
import { layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import BootstrapHelper from "@/lib/BootstrapHelper"
import * as q from '@/lib/requests'
import { Attachment, Comment, Issue } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'

const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

const emit = defineEmits<{
  updated: [ Comment ]
}>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

former.perform = async function() {
  const a_comment = await new q.bug.IssueCommentReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
    req.interpolations.comment_id = comment.value.id
  }).perform(this.form)

  emit("updated", a_comment)
  BootstrapHelper.modal(el).hide()
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

  former.form.content = a_comment.content
  former.form.attachment_ids = a_comment.attachments.map(it => it.id)
  loading.value = false
}

defineExpose({ reset })
</script>
