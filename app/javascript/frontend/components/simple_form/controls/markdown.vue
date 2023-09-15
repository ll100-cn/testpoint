<template>
  <textarea ref="el" v-model="model_value" class="form-control" :name="name" :disabled="disabled" :class="{'is-invalid': validation?.isInvaild() }" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import 'codemirror/lib/codemirror.css'
import EasyMDE from 'easymde'
import 'easymde/src/css/easymde.css'
import { PropType, onMounted, ref } from 'vue'
import * as helper from "../helper"

const props = defineProps({
  validation: { type: Object as PropType<Validation>, required: false },

  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
})

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
const validation = helper.validation(props)

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
