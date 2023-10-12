<template>
  <div class="d-flex border bg-light p-2 align-items-center">
    <div class="me-2" style="width: 3rem">
      <template v-if="attachment.isImage() && attachment.file_url">
        <a :href="attachment.file_url" :data-fancybox="`attachment_${attachment.id}`" target="_blank">
          <div class="ratio ratio-1x1 d-flex align-items-center justify-content-center img-thumbnail overflow-hidden">
            <img :src="attachment.file_url" class="h-100 images" alt="">
          </div>
        </a>
      </template>
      <template v-else-if="attachment.isVideo() && attachment.file_url">
        <a :href="attachment.file_url" data-fancybox-trigger="gallery" :data-fancybox="`attachment_${attachment.id}`" target="_blank">
          <div class="ratio ratio-1x1 d-flex align-items-center justify-content-center">
            <img src="@/assets/images/file.png" class="h-100" alt="">
          </div>
        </a>
      </template>
      <template v-else>
        <div class="ratio ratio-1x1 d-flex align-items-center justify-content-center">
          <img src="@/assets/images/file.png" class="h-100" alt="">
        </div>
      </template>
    </div>

    <div class="flex-column flex-grow-1">
      <div v-if="editing" class="d-flex x-actions">
        <layouts.form_inline v-bind="{ former }" @submit.prevent="former.submit">
          <layouts.group class="mb-0" code="title"><controls.string /></layouts.group>
          <div class="x-actions x-spacer-2 text-nowrap">
            <layouts.submit>确定</layouts.submit>
            <button class="btn btn-secondary" @click.prevent="exitEditing">取消</button>
          </div>
        </layouts.form_inline>
      </div>
      <template v-else>
        <div class="d-flex align-items-center">
          <span class="me-2">{{ _.truncate(attachment.title, { length: 20 }) }}</span>
          <span role="button" class="far fa-fw fa-edit ms-auto" @click="enterEditing" />
        </div>
        <div class="d-flex align-items-center x-actions">
          <span class="text-secondary">{{ prettyBytes(attachment.file_size) }}</span>
          <a v-if="attachment.file_url" class="clipboard ms-1" :href="attachment.file_url" @click.prevent>
            <span class="far fa-fw fa-link text-muted" />
          </a>
          <a class="ms-auto" href="#" @click.prevent="deleteAttachment">
            <span class="far fa-fw fa-trash-alt text-muted" />
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { controls, layouts } from "@/components/simple_form"
import { Attachment } from "@/models"
import ClipboardJS from "clipboard"
import _ from "lodash"
import prettyBytes from "pretty-bytes"
import { nextTick, onMounted, ref } from "vue"
import Former from "./simple_form/Former"

const props = defineProps<{
  attachment: Attachment
}>()

const emit = defineEmits<{
  changed: [Attachment, Partial<Attachment>]
}>()

const editing = ref(false)

const former = Former.build({
  title: props.attachment.title
})

former.perform = async function() {
  const changes = <Partial<Attachment>>{ id: props.attachment.id }
  if (props.attachment.title != this.form.title) {
    changes.title = this.form.title
  }

  editing.value = false
  emit('changed', props.attachment, changes)
}

onMounted(() => {
  nextTick(() => {
    buildClipboard()
  })
})

function buildClipboard() {
  new ClipboardJS(".clipboard", {
    text(trigger: HTMLAnchorElement) {
      return trigger.href
    }
  })
}

function enterEditing() {
  editing.value = true
}

function exitEditing() {
  editing.value = false
}

async function deleteAttachment() {
  if (!confirm("确认删除附件？")) {
    return
  }

  emit('changed', props.attachment, { id: undefined })
}
</script>
