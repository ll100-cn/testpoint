<template>
  <div v-show="easy_mde" :class="{ 'is-invalid': validation.isInvaild() }">
    <textarea ref="el" class="form-control" :name="name" v-bind="control_attrs">{{ local_value }}</textarea>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import 'codemirror/lib/codemirror.css'
import EasyMDE from '../../../../widgets/easymde'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
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

const options = helper.buildControlConfig(props)
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

  if (options.value.control_id) {
    attrs.id = options.value.control_id
  }

  return attrs
})

const el = ref(null! as HTMLElement)
const easy_mde = ref(null as EasyMDE | null)
const local_value = ref(model_value.value)
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
    model_value.value = local_value.value
  })
}

watch(model_value, (new_value) => {
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
