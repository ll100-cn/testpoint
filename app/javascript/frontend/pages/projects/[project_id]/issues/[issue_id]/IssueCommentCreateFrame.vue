<template>
  <div ref="el" class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">新增评论</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body"><IssueCommentForm /></div>
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
import * as requests from '@/lib/requests'
import { Issue, IssueSurvey, Comment } from "@/models"
import { getCurrentInstance, ref } from "vue"
import IssueCommentForm from './IssueCommentForm.vue'

const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

const emit = defineEmits<{
  created: [ Comment ]
}>()

const former = Former.build({
  content: "",
  attachment_ids: []
})

former.perform = async function() {
  const a_comment = await new requests.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = issue.value.project_id
    req.interpolations.issue_id = issue.value.id
  }).perform(this.form)

  emit("created", a_comment)
  BootstrapHelper.modal(el).hide()
}

const issue = ref(null as Issue)
const loading = ref(true)

function reset(a_issue: Issue) {
  issue.value = a_issue
  loading.value = false
}

defineExpose({ reset })
</script>
