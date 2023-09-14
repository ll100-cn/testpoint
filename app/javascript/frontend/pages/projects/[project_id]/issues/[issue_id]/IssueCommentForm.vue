<template>
  <FormErrorAlert :validations="validations" />
  <layouts.vertical_group v-slot="slotProps" :validation="validations.disconnect('content')" label="内容">
    <forms.markdown v-bind="{ ...slotProps, form }" />
  </layouts.vertical_group>
  <AttachmentUploader :attachments="attachments" @change="emits('attachmentChange', $event)" />
</template>

<script setup lang="ts">
import { Validations, forms, layouts } from "@/components/simple_form"
import { Attachment } from "@/models"

import AttachmentUploader from "@/components/AttachmentUploader.vue"
import FormErrorAlert from "@/components/FormErrorAlert.vue"

const props = defineProps<{
  form: any
  validations: Validations
  attachments?: Attachment[]
}>()

const emits = defineEmits<{
  attachmentChange: [attachments: Attachment[]]
}>()
</script>
