<template>
  <div ref="el" class="common-modal modal fade">
    <div class="modal-dialog modal-lg" :class="customModalClass">
      <div class="modal-content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots } from "vue"
import { Modal } from "bootstrap"

const slots = useSlots()

const props = withDefaults(defineProps<{
  customModalClass?: string
  close_btn_text: string
}>(), {
  close_btn_text: "关闭"
})

const emits = defineEmits<{
  close: [event: Event]
}>()

const el = ref(null! as HTMLElement)

onMounted(() => {
  el.value?.addEventListener('hidden.bs.modal', (event) => {
    emits('close', event)
  })
})

function show() {
  if (el.value) {
    Modal.getOrCreateInstance(el.value).show()
  }
}

function hide() {
  if (el.value) {
    Modal.getOrCreateInstance(el.value).hide()
  }
}

async function asyncHide() {
  return new Promise<void>((resolve) => {
    el.value?.addEventListener('hidden.bs.modal', (event) => {
      resolve()
    }, { once: true })
    hide()
  })
}

defineExpose({
  show, hide, asyncHide
})
</script>
