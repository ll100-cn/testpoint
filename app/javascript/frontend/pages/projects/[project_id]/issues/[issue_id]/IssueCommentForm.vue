<template>
  <FormErrorAlert />
  <layouts.group v-slot="slotProps" code="content" label="内容">
    <forms.markdown v-bind="{ ...slotProps, form: former.form }" />
  </layouts.group>
  <AttachmentUploader @change="emit('attachmentChange', $event)" />
</template>

<script setup lang="ts">
import { Validations, forms, layouts } from "@/components/simple_form"
import { Attachment } from "@/models"

import AttachmentUploader from "@/components/AttachmentUploader.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"
import Former from "@/components/simple_form/Former"

const props = defineProps<{
  former: Former<Record<string, any>>
  attachments?: Attachment[]
}>()

const emit = defineEmits<{
  attachmentChange: [attachments: Attachment[]]
}>()
</script>
