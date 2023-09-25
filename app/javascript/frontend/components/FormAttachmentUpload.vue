<template>
  <div class="d-flex border bg-light p-2 align-items-center">
    <div class="me-2" style="width: 3rem">
      <div class="ratio ratio-1x1">
        <img src="@/assets/images/file.png" class="h-100" alt="">
      </div>
    </div>
    <div class="flex-grow-1 flex-column">
      <span class="mb-0">{{ upload_file.file.name }}</span>
      <div class="d-flex align-items-center justify-content-between">
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
import { getCurrentInstance } from 'vue'
import { UploadFile } from './types'

const proxy = getCurrentInstance()!.proxy!

const props = defineProps<{
  upload_file: UploadFile
}>()

function uploadAbort(upload_file: UploadFile) {
  if (upload_file.controller) {
    upload_file.controller.abort()
  }
}
</script>