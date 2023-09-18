<template>
  <textarea ref="el" v-model="model_value" class="form-control" :name="name" v-bind="control_attrs" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import 'codemirror/lib/codemirror.css'
import EasyMDE from 'easymde'
import 'easymde/src/css/easymde.css'
import { PropType, computed, onMounted, ref } from 'vue'
import * as helper from "../helper"
import { ControlProps } from '../helper'

interface Props extends ControlProps {
  validation?: Validation

  name?: string
}

const props = defineProps<Props>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

const options = helper.buildControlOptions(props)
const control_attrs = computed(() => {
  const attrs = { class: [] } as any

  // if (options.value.size == 'small') {
  //   attrs.class.push('btn-sm')
  // } else if (options.value.size == 'large') {
  //   attrs.class.push('btn-lg')
  // }

  if (validation.value.isInvaild()) {
    attrs.class.push("is-invalid")
  }

  if (options.value.disabled) {
    attrs.disabled = true
  }

  return attrs
})

const el = ref(null! as HTMLElement)
const easyMDE = ref<EasyMDE>(null)

onMounted(() => {
  easyMDE.value = new EasyMDE({
    element: el.value,
    status: false,
    autoRefresh: { delay: 250 },
    autoDownloadFontAwesome: false,
  })
  easyMDE.value.codemirror.on("update", () => {
    model_value.value = easyMDE.value.value()
  })
})
</script>

<style scoped lang="scss">
.editor-preview {
  img {
    max-width: 100%;
  }
}
</style>
