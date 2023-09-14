<template>
  <FormErrorAlert :validations="validations" />

  <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('issue_template_id')" label="选择问题模版">
    <forms.bootstrap_select v-bind="{ ...slotProps, form, collection: issue_templates, labelMethod: 'name', valueMethod: 'id', include_blank: '请选择' }" @change="templateChange" />
  </layouts.vertical_group>
  <template v-if="form['issue_template_id']">
    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('title')" label="标题">
      <forms.string v-bind="{ ...slotProps, form: form.issue_attributes }" />
    </layouts.vertical_group>
    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('creator_id')" label="创建人">
      <forms.bootstrap_select v-bind="{ ...slotProps, form: form.issue_attributes, collection: members, labelMethod: 'name', valueMethod: 'id', includeBlank: true, live_search: true }" />
    </layouts.vertical_group>
    <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('content')" label="内容">
      <forms.markdown v-bind="{ ...slotProps, form: form.issue_attributes }" />
    </layouts.vertical_group>
    <layouts.vertical_group>
      <AttachmentUploader @change="emits('attachmentChange', $event)" />
    </layouts.vertical_group>
  </template>

  <template v-if="current_issue_template">
    <hr>
    <layouts.vertical_group v-for="(input, index) in current_issue_template.inputs" :key="index" v-slot="slotProps" :label="input.label">
      <forms.string v-bind="{ ...slotProps, code: 'value', form: form.info_attributes.inputs_attributes[index] }" />
    </layouts.vertical_group>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

import { Validations, forms, layouts } from "@/components/simple_form"
import { Attachment, IssueTemplate, Member } from '@/models'

import AttachmentUploader from '@/components/AttachmentUploader.vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'

const router = useRouter()

const emits = defineEmits<{
  attachmentChange: [attachments: Attachment[]]
}>()

const props = withDefaults(defineProps<{
  issue_templates: IssueTemplate[]
  validations: Validations
  form: object | any
  members: Member[]
  current_issue_template: IssueTemplate
}>(), {
})

function templateChange($event: Event) {
  const issue_template_id = ($event.target as HTMLInputElement).value
  router.push({ query: { issue_template_id } })
}

</script>
