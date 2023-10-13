<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <layouts.group code="issue_template_id" label="选择问题模版">
      <controls.bootstrap_select include_blank="请选择">
        <BSOption v-for="item in issue_templates" :value="item.id">
          {{ item.name }}
        </BSOption>
      </controls.bootstrap_select>
    </layouts.group>
    <template v-if="former.form['issue_template_id']">
      <layouts.group code="issue_attributes.title" label="标题">
        <controls.string />
      </layouts.group>
      <layouts.group code="issue_attributes.content" label="内容">
        <controls.markdown />
      </layouts.group>
      <layouts.group>
        <AttachmentsUploader @changed="onAttachmentsChanged" :attachments="[]" />
      </layouts.group>
    </template>
  </div>

  <template v-if="current_issue_template">
    <hr class="x-form-divider-through">
    <layouts.group v-for="(input, index) in current_issue_template.inputs" :code="`info_attributes.inputs_attributes.${index}.value`" :key="index" :label="input.label">
      <controls.string />
    </layouts.group>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { controls, layouts } from "@/components/simple_form"
import { Attachment, IssueTemplate, Member } from '@/models'
import AttachmentsUploader from '@/components/AttachmentsUploader.vue'
import FormErrorAlert from '@/components/FormErrorAlert.vue'
import Former from "@/components/simple_form/Former"
import BSOption from "@/components/BSOption.vue"

const router = useRouter()

const props = defineProps<{
  issue_templates: IssueTemplate[]
  former: Former<Record<string, any>>
  members: Member[]
  current_issue_template: IssueTemplate
}>()

function templateChange($event: Event) {
  const issue_template_id = ($event.target as HTMLInputElement).value
  router.push({ query: { issue_template_id } })
}

function onAttachmentsChanged(attachments: Partial<Attachment>[]) {
  props.former.form.issue_attributes.attachments_params = attachments
}

</script>
