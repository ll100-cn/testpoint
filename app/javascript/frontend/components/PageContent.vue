<template>
  <textarea ref="textarea" readonly data-controller="markdown" data-action="render->markdown#render" class="d-none" :value="content" />
</template>

<script setup lang="ts">
import { ref, onUpdated } from "vue"

const props = withDefaults(defineProps<{
  content: string
}>(), {
})

const textarea = ref()
onUpdated(() => {
  if (textarea.value) {
    textarea.value.dispatchEvent(new Event('render'))
  }
})
</script>
