<template>
  <div ref="uploadAreaRef" class="upload-area p-2" @dragover.prevent="fileDragOver" @dragleave.prevent="fileDragLeave" @drop.prevent="fileDrop">
    <div class="row g-2 upload-container">
      <template v-for="file in files" :key="file">
        <div class="col-lg-6">
          <AttachmentInfo v-if="file.state != 'uploading'" :attachment="file.attachment" @edited="editAttachment" @deleted="deleteAttachment" />
          <div v-else class="d-flex border bg-light p-2 align-items-center">
            <div class="me-2" style="width: 3rem">
              <div class="ratio ratio-1x1">
                <img src="@/assets/images/file.png" class="h-100" alt="">
              </div>
            </div>
            <div class="flex-grow-1 flex-column">
              <span class="mb-0">{{ file.attachment.title }}</span>
              <div class="d-flex align-items-center justify-content-between">
                <div class="text-secondary small">
                  <span class="upload-size">{{ prettyBytes(file.loaded) }}</span> / {{ prettyBytes(file.total) }}
                </div>
                <a href="#" class="small" @click.prevent="uploadAbort(file)"><span class="far fa-trash-alt" /></a>
              </div>
              <div class="progress" style="height: 4px">
                <div class="upload-progress progress-bar" :style="`width: ${file.loaded / file.total * 100 ?? 0}%`" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="text-muted small text-end pt-2">
      拖拽上传 或者
      <label class="text-primary c-pointer mb-0">
        本地上传
        <input type="file" class="d-none" multiple @change="selected">
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref, watch } from "vue"

import * as requests from "@/requests"
import prettyBytes from 'pretty-bytes'

import _ from "lodash"
import AttachmentInfo from "./AttachmentInfo.vue"
import { Attachment } from "@/models"
import { plainToInstance } from "class-transformer"
import { AxiosProgressEvent } from "axios"

// const props = defineProps<{}>()
const { proxy } = getCurrentInstance()

type UploadFile = {
  state: "pending" | "success" | "uploading"
  loaded?: number
  total?: number
  controller?: AbortController
  attachment?: Attachment
}

const emits = defineEmits<{
  change: [attachments: Attachment[]]
}>()
const files = ref<UploadFile[]>([])
const uploadAreaRef = ref<HTMLElement>()

watch(files, (newValue, oldValue) => {
  const attachments = _.compact(_.map(newValue, (uploadFile) => {
    if (uploadFile.state == "success") {
      return uploadFile.attachment
    }
  }))
  emits("change", attachments)
}, { deep: true })

function selected(event: Event) {
  const input_node = event.target as HTMLInputElement
  const files = input_node.files
  _.each(files, (file) => {
    upload(file)
  })
  input_node.value = ""
}

async function upload(file: File) {
  if (!file) return

  const attachment = plainToInstance(Attachment, {
    title: file.name,
    content_type: file.type,
    file_size: file.size,
  })
  const upload_file = reactive<UploadFile>({ state: "pending", loaded: 0, total: file.size, controller: new AbortController(), attachment })
  files.value.push(upload_file)

  try {
    const attachment = await new requests.AttachmentCreate().setup(proxy, (req) => {
      req.conifg = {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          upload_file.state = "uploading"
          upload_file.loaded = progressEvent.loaded
          upload_file.total = progressEvent.total
        },
        signal: upload_file.controller.signal
      }
    }).perform({ file: file })
    upload_file.attachment = attachment
    upload_file.state = "success"
  } catch (error) {
    if (error.name == "CanceledError") {
      const index = files.value.findIndex((obj) => obj === upload_file)
      if (index !== -1) {
        files.value.splice(index, 1)
      }
      return
    }

    throw error
  }
}

function uploadAbort(upload_file: UploadFile) {
  if (upload_file.controller) {
    upload_file.controller.abort()
  }
}

function editAttachment(attachment: Attachment) {
  const index = _.findIndex(files.value, (uploadFile) => {
    return uploadFile.attachment.id == attachment.id
  })
  if (index >= 0) {
    files.value[index].attachment = attachment
  }
}

function deleteAttachment(attachment: Attachment) {
  const index = _.findIndex(files.value, (uploadFile) => {
    return uploadFile.attachment.id == attachment.id
  })
  if (index >= 0) {
    files.value.splice(index, 1)
  }
}

function fileDragOver() {
  uploadAreaRef.value.classList.add('highlight')
}

function fileDragLeave() {
  uploadAreaRef.value.classList.remove('highlight')
}

function fileDrop(event: DragEvent) {
  fileDragLeave()
  const { files } = event.dataTransfer

  _.each(files, (file) => {
    upload(file)
  })
}

</script>
