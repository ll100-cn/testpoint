<template>
  <div>
    <div class="no-margin-bottom markdown-body">
      <textarea ref="textarea" readonly data-controller="markdown" data-action="render->markdown#render" class="hidden" :value="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from "vue"

const props = defineProps<{
  content: string
}>()

const textarea = ref()
onUpdated(() => {
  if (textarea.value) {
    textarea.value.dispatchEvent(new Event('render'))
  }
})
</script>
