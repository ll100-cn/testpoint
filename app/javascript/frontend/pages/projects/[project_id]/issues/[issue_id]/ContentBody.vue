<template>
  <div>
    <PageContent :content="body.content" />
    <span v-if="is_edited" class="text-muted small mt-1">
      最后修改于: {{ utils.humanize(body.last_edited_at, DATE_LONG_FORMAT) }}
    </span>

    <div class="row mt-2" v-if="body.attachments.length > 0">
      <div v-for="attachment in body.attachments" :key="attachment.id" class="col-lg-6">
        <AttachmentInfo :attachment="attachment" @deleted="emit('attachment_destroyed', $event)" @edited="emit('attachment_updated', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Attachment } from '@/models'
import * as utils from "@/lib/utils"
import { DATE_LONG_FORMAT } from '@/constants'
import PageContent from '@/components/PageContent.vue'
import { computed } from 'vue'
import AttachmentInfo from '@/components/AttachmentInfo.vue'

interface ContentBody {
  content: string
  attachments: Attachment[]
  created_at: Date
  last_edited_at?: Date
}

const emit = defineEmits<{
  attachment_destroyed: [ Attachment ]
  attachment_updated: [ Attachment ]
}>()

const props = defineProps<{
  body: ContentBody
}>()

const is_edited = computed(() => props.body.last_edited_at && props.body.created_at != props.body.last_edited_at)
</script>