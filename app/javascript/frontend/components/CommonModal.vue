<template>
  <div ref="el" class="common-modal modal fade">
    <div class="modal-dialog modal-lg" :class="customModalClass">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="title" />
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ close_btn_text }}
          </button>
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

import { Modal } from "bootstrap"

const props = withDefaults(defineProps<{
  customModalClass?: string
  close_btn_text: string
}>(), {
  close_btn_text: "关闭"
})

const emits = defineEmits<{
  close: [event: Event]
}>()

const el = ref<HTMLElement>()

onMounted(() => {
  el.value.addEventListener('hidden.bs.modal', (event) => {
    emits('close', event)
  })
})

function show() {
  console.log(Modal.getOrCreateInstance(el.value), 1111111111111)
  Modal.getOrCreateInstance(el.value).show()
}

function hide() {
  Modal.getOrCreateInstance(el.value).hide()
}

async function asyncHide() {
  return new Promise<void>((resolve) => {
    el.value.addEventListener('hidden.bs.modal', (event) => {
      resolve()
    }, { once: true })
    this.modalHide()
  })
}

defineExpose({
  show, hide, asyncHide
})
</script>
