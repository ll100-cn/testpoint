<template>
  <CommonModal ref="modal" close_btn_text="取消">
    <template #title>
      <h5 class="mb-0">关联问题</h5>
    </template>
    <template #body>
      <FormErrorAlert :validations="validations" />
      <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('target_id')" label="关联的问题ID">
        <forms.number v-bind="{ ...slotProps, form }" />
      </layouts.vertical_group>
      <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('creator_subscribe_target_issue')">
        <forms.checkboxes v-bind="{ ...slotProps, form, collection: [{ label: '使创建人订阅关联的问题', value: true }], labelMethod: 'label', valueMethod: 'value' }" />
      </layouts.vertical_group>
    </template>
    <template #footer>
      <button class="btn btn-primary" @click="onCreateIssueRelationship">新增关联问题</button>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from "vue"

import { Validations, forms, layouts } from "@/components/simple_form"
import { Issue, IssueRelationship } from "@/models"
import * as requests from '@/lib/requests'
import _ from "lodash"

import FormErrorAlert from '@/components/FormErrorAlert.vue'
import CommonModal from "@/components/CommonModal.vue"

const { proxy } = getCurrentInstance()
const props = defineProps<{
  issue: Issue
}>()
const emits = defineEmits<{
  addRelationship: [issue_relationship: IssueRelationship]
}>()

const modal = ref<InstanceType<typeof CommonModal>>()
const form = ref({
  target_id: undefined,
  creator_subscribe_target_issue: true
})
const validations = ref(new Validations())

const _form = _.cloneDeep(form.value)

function resetForm() {
  form.value = _form
}

function show() {
  modal.value.show()
}

async function onCreateIssueRelationship() {
  validations.value.clear()

  try {
    const issue_relationship = await new requests.IssueRelationshipReq.Create().setup(proxy, (req) => {
      req.interpolations.project_id = props.issue.project_id
      req.interpolations.issue_id = props.issue.id
    }).perform(form.value)
    if (issue_relationship) {
      emits("addRelationship", issue_relationship)
      resetForm()
      modal.value.hide()
    }
  } catch (error) {
    if (validations.value.handleError(error)) {
      return
    }

    throw error
  }
}

defineExpose({
  show
})
</script>
