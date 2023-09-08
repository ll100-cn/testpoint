<template>
  <div class="attachments-box">
    <div v-for="attachment in attachments" :key="attachment.id" class="attachment-item">
      <AttachmentInfo :attachment="attachment" @deleted="emits('deleted', $event)" @edited="emits('edited', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Attachment } from "@/models"

import AttachmentInfo from "./AttachmentInfo.vue"

const props = defineProps<{
  attachments: Attachment[]
}>()

const emits = defineEmits<{
  deleted: [attachment: Attachment]
  edited: [attachment: Attachment]
}>()

</script>
