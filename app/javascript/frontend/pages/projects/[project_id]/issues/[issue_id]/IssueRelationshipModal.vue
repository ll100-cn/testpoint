<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #content>
      <div class="modal-header">
        <h5 class="mb-0">关联问题</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit">
        <div class="modal-body">
          <FormErrorAlert />
          <div class="row gy-3">
            <layouts.group code="target_id" label="关联的问题ID">
              <controls.number />
            </layouts.group>
            <layouts.group code="creator_subscribe_target_issue">
              <controls.checkboxes v-bind="{ collection: [{ label: '使创建人订阅关联的问题', value: true }], labelMethod: 'label', valueMethod: 'value' }" />
            </layouts.group>
          </div>
        </div>
        <div class="modal-footer x-spacer-2">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <layouts.submit>新增关联问题</layouts.submit>
        </div>
      </layouts.form_vertical>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from "@/components/CommonModal.vue"
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import * as requests from '@/lib/requests'
import { Issue, IssueRelationship } from "@/models"
import _ from "lodash"
import { getCurrentInstance, ref } from "vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  addRelationship: [issue_relationship: IssueRelationship]
}>()

const modal = ref<InstanceType<typeof CommonModal>>()
const former = Former.build({
  target_id: undefined,
  creator_subscribe_target_issue: true
})

former.perform = async function() {
  const issue_relationship = await new requests.IssueRelationshipReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue.project_id
    req.interpolations.issue_id = props.issue.id
  }).perform(former.form)

  emits("addRelationship", issue_relationship)
  resetForm()
  modal.value.hide()
}

const _form = _.cloneDeep(former.form)

function resetForm() {
  former.form = _form
}

function show() {
  modal.value.show()
}

defineExpose({
  show
})
</script>
