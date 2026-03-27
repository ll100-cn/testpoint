<template>
  <div>
    <div class="no-margin-bottom markdown-body">
      <textarea ref="textarea" readonly class="hidden" :value="content" />
      <div ref="view"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated, useTemplateRef, onMounted, onUnmounted } from "vue"
import { replaceMarkdownTaskList, renderMarkdown } from "$vendor/showdown"
import _ from "lodash"
import $ from "jquery"

const props = withDefaults(defineProps<{
  content: string
  readonly?: boolean
}>(), {
  readonly: false
})

const emit = defineEmits<{
  (e: 'update:content', value: string): void
}>()

const textarea = useTemplateRef('textarea')
const view = useTemplateRef('view')

onMounted(() => {
  renderView()
  bindEvents()
})

onUpdated(() => {
  renderView()
})

function toggleTaskList(event: Event) {
  const inputElement = textarea.value
  const checkbox = event.target as HTMLInputElement
  const newMark = checkbox.checked ? "[x]" : "[ ]"
  const currentPosition = parseInt(checkbox.dataset.position!)

  if (props.readonly) {
    event.preventDefault()
    return
  }

  inputElement!.value = replaceMarkdownTaskList(inputElement!.value, function (mark: string, position: number) {
    return currentPosition == position ? newMark : mark
  })

  const inputEvent = new Event('input', {
    bubbles: true,
    cancelable: true,
  })
  inputElement!.dispatchEvent(inputEvent)

  $(inputElement!).trigger("change")
  emit("update:content", inputElement!.value)
}

function renderView() {
  const inputElement = textarea.value
  const options = { checkbox: { readonly: props.readonly } }
  view.value!.innerHTML = renderMarkdown(_.trim(inputElement!.value), options)
  $(view.value!).find("input[type=checkbox][data-indeterminate]").prop("indeterminate", true)
}

function bindEvents() {
  $(view.value!).on("change.tasklist", "input[type=checkbox][data-position]", toggleTaskList)
}
</script>
