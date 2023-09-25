<template>
  <div ref="el" class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">确认</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">确认后将归档该问题, 无法编辑, 是否确认问题已解决？</div>
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
import { IssueInfo } from "@/models"
import { getCurrentInstance, ref } from "vue"

const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

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

former.perform = async function() {
  const a_issue = await new q.bug.IssueReq.Archive().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform()

  Object.assign(props.issue_info, a_issue)
  emit("updated", props.issue_info)
  BootstrapHelper.modal(el).hide()
}

const loading = ref(true)

function reset() {
  loading.value = false
}

defineExpose({ reset })
</script>
