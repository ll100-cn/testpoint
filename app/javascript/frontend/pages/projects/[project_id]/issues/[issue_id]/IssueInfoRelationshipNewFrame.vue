<template>
  <div ref="el" class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="mb-0">关联问题</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>

      <layouts.form_vertical v-bind="{ former }" @submit.prevent="former.submit" v-if="!loading">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import { controls, layouts } from "@/components/simple_form"
import Former from "@/components/simple_form/Former"
import BootstrapHelper from "@/lib/BootstrapHelper"
import * as q from '@/lib/requests'
import { IssueInfo } from "@/models"
import { getCurrentInstance, ref } from "vue"

const el = ref(null! as HTMLElement)
const { proxy } = getCurrentInstance()

const emit = defineEmits<{
  changed: [ IssueInfo ]
}>()

const props = defineProps<{
  issue_info: IssueInfo
}>()

const former = Former.build({
  target_id: undefined,
  creator_subscribe_target_issue: true
})

former.perform = async function() {
  const a_issue_relationship = await new q.bug.IssueRelationshipReq.Create().setup(proxy, (req) => {
    req.interpolations.project_id = props.issue_info.project_id
    req.interpolations.issue_id = props.issue_info.id
  }).perform(former.form)

  props.issue_info.source_relationships.push(a_issue_relationship)
  emit('changed', props.issue_info)

  BootstrapHelper.modal(el).hide()
}

const loading = ref(true)

function reset() {
  loading.value = false
}

defineExpose({ reset })
</script>
