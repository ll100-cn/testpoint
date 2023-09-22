<template>
  <div ref="el" class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
        <div class="modal-body">
          <IssueCommentForm :former="former" :attachments="issue_info.attachments" />
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>提交修改</layouts.submit>
        </div>
      </layouts.form_vertical>
    </div>
  </div>
</template>

<script setup lang="ts">
import { layouts } from '@/components/simple_form'
import Former from '@/components/simple_form/Former'
import BootstrapHelper from '@/lib/BootstrapHelper'
import * as requests from '@/lib/requests'
import { Attachment, IssueInfo } from '@/models'
import { getCurrentInstance, ref } from 'vue'
import IssueCommentForm from './IssueCommentForm.vue'

const { proxy } = getCurrentInstance()
const el = ref(null! as HTMLElement)

const emit = defineEmits<{
  changed: [IssueInfo]
}>()

const issue_info = ref(null as IssueInfo | null)

const former = Former.build({
  content: '',
  attachments_params: [] as Partial<Attachment>[]
})

former.perform = async function() {
  const a_issue_body = await new requests.IssueBodyReq.Update().setup(proxy, (req) => {
    req.interpolations.project_id = issue_info.value.project_id
    req.interpolations.issue_id = issue_info.value.id
  }).perform(this.form)

  Object.assign(issue_info.value, a_issue_body.issue)
  issue_info.value.attachments = a_issue_body.attachments

  emit("changed", issue_info.value)
  BootstrapHelper.modal(el).hide()
}

const loading = ref(true)
function reset(a_issue_info: IssueInfo) {
  loading.value = true

  issue_info.value = a_issue_info
  former.form.content = a_issue_info.content
  former.form.attachments_params = a_issue_info.attachments.map(it => {
    return { id: it.id }
  })

  loading.value = false
}

defineExpose({ reset })

</script>