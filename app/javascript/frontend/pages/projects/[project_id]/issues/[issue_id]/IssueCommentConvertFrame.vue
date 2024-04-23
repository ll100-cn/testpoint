<template>
  <div ref="el" class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">转换</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">
          <FormErrorAlert />

          <div class="row gy-3">
            <layouts.group code="comment_id" label="评论 ID" hint="ID 为空则是评论">
              <controls.number />
            </layouts.group>
          </div>
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
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import BootstrapHelper from "@/lib/BootstrapHelper"
import * as q from '@/lib/requests'
import { Comment, Issue } from "@/models"
import { getCurrentInstance, ref } from "vue"

const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

const emit = defineEmits<{
  updated: [ Comment ]
}>()

const former = Former.build({
  comment_id: null as number | null
})

former.perform = async function() {
  const a_comment = await new q.bug.IssueCommentReq.Convert().setup(proxy, (req) => {
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

function reset(a_issue: Issue, a_comment: Comment) {
  issue.value = a_issue
  comment.value = a_comment

  former.form.comment_id = comment.value.comment_id

  loading.value = false
}

defineExpose({ reset })
</script>
