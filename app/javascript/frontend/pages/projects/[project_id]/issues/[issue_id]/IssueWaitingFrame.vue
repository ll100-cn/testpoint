<template>
  <div ref="el" class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">等待反馈</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">
          <IssueCommentForm :former="former" :attachments="[]" />
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>确认</layouts.submit>
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
import { Comment, IssueInfo } from "@/models"
import { getCurrentInstance, nextTick, ref } from "vue"
import IssueCommentForm from "./IssueCommentForm.vue"

const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

const emit = defineEmits<{
  created: [ IssueInfo, Comment ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()


const former = Former.build({
  content: "",
  attachments_params: []
})

former.perform = async function() {
  const a_comment = await new q.bug.IssueCommentReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(this.form)

  const a_issue_action = await new q.bug.IssueActionReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform({ state: "waiting" })

  Object.assign(props.issue_info, a_issue_action.issue)
  props.issue_info.activities.push(...a_issue_action.activities)

  emit("created", props.issue_info, a_comment)
  BootstrapHelper.modal(el).hide()
}

const loading = ref(true)
async function reset() {
  loading.value = true

  nextTick(() => {
    loading.value = false
  })
}

defineExpose({
  reset
})

</script>
