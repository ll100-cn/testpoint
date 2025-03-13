<template>
  <div v-show="easy_mde" v-bind="controlAttrs" :class="cn(inputPresenter.input(inputPresenterConfig), props.class)" class="markdown-editor">
    <textarea ref="el" class="form-control" :id="controlId">{{ local_value }}</textarea>
  </div>
</template>

<script setup lang="ts">

import { useInputPresenters, type InputPresenterConfig } from '$ui/input'
import { relayFormPresenterConfig, useControlId, useControlValue, type FormPresenterConfig } from '$ui/simple_form'
import { cn } from '$ui/utils'
import EasyMDE from '$vendor/easymde'
import { computed, nextTick, onMounted, ref, watch, type HTMLAttributes } from 'vue'


interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<FormPresenterConfig>>()

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel()
const modelValue = useControlValue(defaultModelValue)
const controlId = useControlId()

const inputPresenters = useInputPresenters()
const inputPresenter = computed(() => inputPresenters.standard)
const inputPresenterConfig = computed(() => {
  const config = {} as InputPresenterConfig
  config.size = presenterConfig.value.size ?? 'default'
  return config
})

const extraAttrs = ref(new Map<string, any>())
const controlAttrs = computed(() => {
  const attrs = { class: [] } as any

  for (const [key, value] of extraAttrs.value) {
    attrs[key] = value
  }

  return attrs
})

const el = ref(null! as HTMLElement)
const easy_mde = ref(null as EasyMDE | null)
const local_value = ref(modelValue.value)
const delay_render_id = ref(null as any)

function delayRenderEasyMDE() {
  if (delay_render_id.value) {
    clearTimeout(delay_render_id.value)
  }

  if (easy_mde.value) {
    easy_mde.value.toTextArea()
    easy_mde.value = null
  }

  nextTick(() => {
    delay_render_id.value = setTimeout(() => {
      buildEasyMDE()
    }, 500)
  })
}

onMounted(() => {
  delayRenderEasyMDE()
})

function buildEasyMDE() {
  easy_mde.value = new EasyMDE({
    element: el.value,
    initialValue: local_value.value,
    status: false,
    autoDownloadFontAwesome: false
  })

  easy_mde.value.codemirror.on("update", () => {
    local_value.value = easy_mde.value?.value() ?? ''
    modelValue.value = local_value.value
  })

  easy_mde.value.codemirror.on("focus", () => {
    extraAttrs.value.set("data-focus", true)
  })

  easy_mde.value.codemirror.on("blur", () => {
    extraAttrs.value.delete("data-focus")
  })
}

watch(modelValue, (new_value) => {
  if (local_value.value != new_value) {
    local_value.value = new_value

    delayRenderEasyMDE()
  }
})
</script>

<style scoped>
@reference "../../assets/theme/main.css";

.editor-preview {
  img {
    max-width: 100%;
  }
}

.markdown-editor::v-deep .editor-toolbar {
  @apply border-0;
}

.markdown-editor::v-deep .CodeMirror {
  @apply border-0 border-t border-input-border;
}
</style>
