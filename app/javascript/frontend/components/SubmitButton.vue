<template>
  <button type="submit" class="btn" :class="`btn-${type}`" :disabled="submitting" @click="onSubmit">
    <span v-if="submitting"><i class="spinner-border spinner-border-sm me-1" />{{ submitting_text }}</span>
    <span v-else>{{ submit_text }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue"

const props = defineProps({
  submit_text: { type: String, default: "提交" },
  submitting_text: { type: String, default: "正在提交" },
  type: { type: String as PropType<"primary" | "danger" | "secondary" | "success">, default: "primary" },
  func: { type: Function }
})

const submitting = ref(false)

async function onSubmit(event: Event) {
  event.preventDefault()
  submitting.value = true
  try {
    await props.func()
  } catch (error) {
    throw error
  } finally {
    submitting.value = false
  }
}
</script>
