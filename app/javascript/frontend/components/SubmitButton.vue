<template>
  <button type="submit" class="btn text-nowrap" :class="`btn-${type}`" :disabled="submitting" @click="onSubmit">
    <span v-if="submitting"><i class="spinner-border spinner-border-sm me-1" />{{ submitting_text }}</span>
    <span v-else>{{ submit_text }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue"

const props = withDefaults(defineProps<{
  submit_text?: string
  submitting_text?: string
  type?: "primary" | "danger" | "secondary" | "success"
  func?: Function
  not_prevent_default?: boolean
}>(), {
  submit_text: "提交",
  submitting_text: "正在提交",
  type: "primary",
  not_prevent_default: false
})

const submitting = ref(false)

async function onSubmit(event: Event) {
  if (!props.not_prevent_default) {
    event.preventDefault()
  }
  submitting.value = true
  try {
    if (props.func) {
      await props.func()
    }
  } catch (error) {
    throw error
  } finally {
    submitting.value = false
  }
}
</script>
