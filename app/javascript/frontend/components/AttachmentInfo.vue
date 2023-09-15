<template>
  <div ref="el" class="d-flex border bg-light p-2 align-items-center">
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
        <FormInline v-bind="{ former }" @submit.prevent="former.submit">
          <layouts.group class="mb-0" code="title"><forms.string /></layouts.group>
          <div class="x-actions text-nowrap">
            <layouts.submit>更新</layouts.submit>
            <button class="btn btn-secondary" @click.prevent="cancelEdit">取消</button>
          </div>
        </FormInline>
      </div>
      <template v-else>
        <div class="d-flex align-items-center">
          <span class="me-2">{{ _.truncate(attachment.title, { length: 20 }) }}</span>
          <span role="button" class="far fa-fw fa-edit ms-auto" @click="onEdit" />
        </div>
        <div class="d-flex align-items-center x-actions">
          <span class="text-secondary">{{ prettyBytes(attachment.file_size) }}</span>
          <a v-if="attachment.file_url" class="clipboard" :href="attachment.file_url" @click.prevent>
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
import { Validations, forms, layouts } from "@/components/simple_form"
import { getCurrentInstance, nextTick, onMounted, onUpdated, ref } from "vue"

import * as requests from '@/lib/requests'
import ClipboardJS from "clipboard"
import prettyBytes from "pretty-bytes"
import _ from "lodash"

import { Attachment } from "@/models"
import FormInline from "./FormInline.vue"
import Former from "./simple_form/Former"

const { proxy } = getCurrentInstance()

const props = defineProps<{
  attachment: Attachment
}>()
const emits = defineEmits<{
  deleted: [attachment: Attachment]
  edited: [attachment: Attachment]
}>()

const el = ref(null! as HTMLElement)
const validations = ref(new Validations())
const editing = ref(false)

const former = Former.build({
  title: ""
})

former.perform = async function() {
  const attachment = await new requests.AttachmentReq.Update().setup(proxy, (req) => {
    req.interpolations.attachment_id = props.attachment.id
  }).perform(this.form)

  editing.value = false
  emits('edited', attachment)
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

function onEdit() {
  editing.value = true
  former.form.title = props.attachment.title
}

function cancelEdit() {
  editing.value = false
  validations.value.clear()
}

async function deleteAttachment() {
  if (!confirm("确认删除附件？")) {
    return
  }
  validations.value.clear()

  try {
    const attachment = await new requests.AttachmentReq.Destroy().setup(proxy, (req) => {
      req.interpolations.attachment_id = props.attachment.id
    }).perform()
    if (attachment) {
      emits('deleted', attachment)
    }
  } catch (err) {
    if (validations.value.handleError(err)) {
      return
    }

    throw err
  }
}
</script>
