<template>
  <FormErrorAlert />

  <layouts.group code="issue_template_id" label="选择问题模版">
    <controls.bootstrap_select v-bind="{ collection: issue_templates, labelMethod: 'name', valueMethod: 'id', include_blank: '请选择' }" @change="templateChange" />
  </layouts.group>
  <template v-if="former.form['issue_template_id']">
    <layouts.group code="title" label="标题">
      <controls.string v-bind="{ form: former.form.issue_attributes }" />
    </layouts.group>
    <layouts.group code="creator_id" label="创建人">
      <controls.bootstrap_select v-bind="{ form: former.form.issue_attributes, collection: members, labelMethod: 'name', valueMethod: 'id', includeBlank: true, live_search: true }" />
    </layouts.group>
    <layouts.group code="content" label="内容">
      <controls.markdown v-bind="{ form: former.form.issue_attributes }" />
    </layouts.group>
    <layouts.group>
      <AttachmentUploader @change="emits('attachmentChange', $event)" />
    </layouts.group>
  </template>

  <template v-if="current_issue_template">
    <hr>
    <layouts.group v-for="(input, index) in current_issue_template.inputs" :code="`info_attributes.inputs_attributes.${index}.value`" :key="index" :label="input.label">
      <controls.string />
    </layouts.group>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

import { controls, layouts } from "@/components/simple_form"
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
