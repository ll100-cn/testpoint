<template>
  <div v-show="easy_mde" :class="{ 'is-invalid': validation.state == 'invalid' }">
    <textarea ref="el" class="form-control">{{ local_value }}</textarea>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import 'codemirror/lib/codemirror.css'
import EasyMDE from '../../../vendor/easymde'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import * as helper from "../simple_form/helper"
import { type ControlProps } from '../simple_form/helper'
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types'

interface Props extends ControlProps {
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())

const options = helper.buildControlConfig(props)
const control_attrs = computed(() => {
  const attrs = { class: [] } as any

  // if (options.value.size == 'small') {
  //   attrs.class.push('btn-sm')
  // } else if (options.value.size == 'large') {
  //   attrs.class.push('btn-lg')
  // }

  if (validation.value.state == "invalid") {
    attrs.class.push("is-invalid")
  }

  if (presenterConfig.value.disabled) {
    attrs.disabled = true
  }

  if (options.value.control_id) {
    attrs.id = options.value.control_id
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
    local_value.value = easy_mde.value.value()
    modelValue.value = local_value.value
  })
}

watch(modelValue, (new_value) => {
  if (local_value.value != new_value) {
    local_value.value = new_value

    delayRenderEasyMDE()
  }
})
</script>

<style scoped lang="scss">
.editor-preview {
  img {
    max-width: 100%;
  }
}
</style>
