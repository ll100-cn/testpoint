<template>
  <FormErrorAlert />

  <div class="row gy-3">
    <layouts.group code="content" label="内容">
      <controls.markdown />
    </layouts.group>

    <AttachmentsUploader @changed="onAttachmentsChanged" :attachments="attachments" />
  </div>
</template>

<script setup lang="ts">
import { controls, layouts } from "@/components/simple_form"
import { Attachment } from "@/models"
import AttachmentsUploader from "@/components/AttachmentsUploader.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import Former from "@/components/simple_form/Former"

const props = defineProps<{
  former: Former<any>
  attachments: Attachment[]
}>()

function onAttachmentsChanged(changes_list: Partial<Attachment>[]) {
  props.former.form.attachments_params = changes_list
}
</script>
