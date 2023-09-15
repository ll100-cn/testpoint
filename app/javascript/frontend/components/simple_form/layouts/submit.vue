<template>
  <button type="submit" class="btn" :class="`btn-${type}`" :disabled="submitting">
    <span v-if="submitting"><i class="spinner-border spinner-border-sm me-1" />{{ submitting_text }}</span>
    <slot v-else-if="slots.default" />
    <span v-else>提交</span>
  </button>
</template>

<script setup lang="ts">
import { computed, inject, ref, useSlots } from "vue"
import Former from "../Former"

const slots = useSlots()
const props = withDefaults(defineProps<{
  submitting_text?: string
  type?: "primary" | "danger" | "secondary" | "success"
}>(), {
  submitting_text: "正在提交",
  type: "primary",
})

const former = inject('former') as Former<Record<string, any>>
const submitting = computed(() => former.submitting)

</script>
