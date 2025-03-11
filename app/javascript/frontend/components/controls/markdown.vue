<template>
  <div v-show="easy_mde" v-bind="controlAttrs" :class="cn(inputPresenter.input(inputPresenterConfig), props.class)" class="markdown-editor">
    <textarea ref="el" class="form-control">{{ local_value }}</textarea>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'

import EasyMDE from '$vendor/easymde'
import { computed, nextTick, onMounted, ref, watch, type HTMLAttributes } from 'vue'
import * as helper from "../simple_form/helper"
import { type ControlProps } from '../simple_form/helper'
import { type ControlConfig, type FormPresenterConfig, relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types'
import { useInputPresenters, type InputPresenterConfig } from '$ui/input'
import { cn } from '$ui/utils'


interface Props extends ControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

const inputPresenters = useInputPresenters()
const inputPresenter = computed(() => inputPresenters.standard)
const inputPresenterConfig = computed(() => {
  const config = {} as InputPresenterConfig

  if (options.value.size == 'small') {
    config.size = 'sm'
  } else if (options.value.size == 'large') {
    config.size = 'lg'
  }

  return config
})

const extraAttrs = ref(new Map<string, any>())

const options = helper.buildControlConfig(props)
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
@reference "../../../../../assets/theme/main.css";

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
