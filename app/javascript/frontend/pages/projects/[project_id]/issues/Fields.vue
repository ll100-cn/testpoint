<template>
  <FormErrorAlert />

  <layouts.group v-slot="slotProps" code="issue_template_id" label="选择问题模版">
    <forms.bootstrap_select v-bind="{ ...slotProps, form: former.form, collection: issue_templates, labelMethod: 'name', valueMethod: 'id', include_blank: '请选择' }" @change="templateChange" />
  </layouts.group>
  <template v-if="former.form['issue_template_id']">
    <layouts.group v-slot="slotProps" code="title" label="标题">
      <forms.string v-bind="{ ...slotProps, form: former.form.issue_attributes }" />
    </layouts.group>
    <layouts.group v-slot="slotProps" code="creator_id" label="创建人">
      <forms.bootstrap_select v-bind="{ ...slotProps, form: former.form.issue_attributes, collection: members, labelMethod: 'name', valueMethod: 'id', includeBlank: true, live_search: true }" />
    </layouts.group>
    <layouts.group v-slot="slotProps" code="content" label="内容">
      <forms.markdown v-bind="{ ...slotProps, form: former.form.issue_attributes }" />
    </layouts.group>
    <layouts.group>
      <AttachmentUploader @change="emits('attachmentChange', $event)" />
    </layouts.group>
  </template>

  <template v-if="current_issue_template">
    <hr>
    <layouts.group v-for="(input, index) in current_issue_template.inputs" :key="index" v-slot="slotProps" :label="input.label">
      <forms.string v-bind="{ ...slotProps, code: 'value', form: former.form.info_attributes.inputs_attributes[index] }" />
    </layouts.group>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

import { forms, layouts } from "@/components/simple_form"
import { Attachment, IssueTemplate, Member } from '@/models'

import AttachmentUploader from '@/components/AttachmentUploader.vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import Former from "@/components/simple_form/Former"

const router = useRouter()

const emits = defineEmits<{
  attachmentChange: [attachments: Attachment[]]
}>()

const props = withDefaults(defineProps<{
  issue_templates: IssueTemplate[]
  former: Former<Record<string, any>>
  members: Member[]
  current_issue_template: IssueTemplate
}>(), {
})

function templateChange($event: Event) {
  const issue_template_id = ($event.target as HTMLInputElement).value
  router.push({ query: { issue_template_id } })
}

</script>
