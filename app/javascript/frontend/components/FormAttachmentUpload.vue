<template>
  <div class="flex border bg-light p-2 items-center">
    <div class="me-2" style="width: 3rem">
      <div class="aspect-square">
        <img src="@/assets/images/file.png" class="h-100" alt="">
      </div>
    </div>
    <div class="grow-1 flex-column">
      <span class="mb-0">{{ upload_file.file.name }}</span>
      <div class="flex items-center justify-content-between">
        <div class="text-secondary small">
          <span class="upload-size">{{ prettyBytes(upload_file.loaded) }}</span> / {{ prettyBytes(upload_file.total) }}
        </div>
        <a href="#" class="small" @click.prevent="uploadAbort(upload_file)"><span class="far fa-trash-alt" /></a>
      </div>
      <div class="progress" style="height: 4px">
        <div class="upload-progress progress-bar" :style="`width: ${upload_file.loaded / upload_file.total * 100 ?? 0}%`" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import prettyBytes from 'pretty-bytes'
import { UploadFile } from './types'

const props = defineProps<{
  upload_file: UploadFile
}>()

// TODO: 取消现在无效
function uploadAbort(upload_file: UploadFile) {
  if (upload_file.controller) {
    upload_file.controller.abort()
  }
}
</script>
