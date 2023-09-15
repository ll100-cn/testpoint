<template>
  <FormErrorAlert />
  <layouts.group code="content" label="内容">
    <forms.markdown />
  </layouts.group>
  <AttachmentUploader @change="emit('attachmentChange', $event)" />
</template>

<script setup lang="ts">
import { forms, layouts } from "@/components/simple_form"
import { Attachment } from "@/models"

import AttachmentUploader from "@/components/AttachmentUploader.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"

const props = defineProps<{
  attachments?: Attachment[]
}>()

const emit = defineEmits<{
  attachmentChange: [attachments: Attachment[]]
}>()
</script>
