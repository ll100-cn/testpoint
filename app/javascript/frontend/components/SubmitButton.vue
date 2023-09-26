<template>
  <button type="button" @click="onSubmit" class="btn text-nowrap" :class="`btn-${type} ${custom_class}`" :disabled="disabled">
    <span v-if="submitting"><i class="spinner-border spinner-border-sm me-1" />{{ submitting_text }}</span>
    <span v-else>{{ submit_text }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"

const props = withDefaults(defineProps<{
  submit_text?: string
  submitting_text?: string
  type?: "primary" | "danger" | "secondary" | "success"
  func?: Function
  disabled?: boolean
  custom_class?: string
}>(), {
  submit_text: "提交",
  submitting_text: "正在提交",
  type: "primary",
})

const submitting = ref(false)

async function onSubmit(event: Event) {
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

const disabled = computed(() => props.disabled || submitting.value)
</script>
