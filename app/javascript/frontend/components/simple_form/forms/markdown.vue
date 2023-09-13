<template>
  <textarea ref="el" v-model="form[code]" class="form-control" :name="name ?? code" :disabled="disabled" :class="{'is-invalid': validation?.isInvaild() }" />
</template>

<script setup lang="ts">
import { PropType, onMounted, ref } from 'vue'

import { Validation } from '@/models'
import EasyMDE from 'easymde'

import 'codemirror/lib/codemirror.css'
import 'easymde/src/css/easymde.css'

const props = defineProps({
  label: { type: String, required: false },
  code: { type: String, required: true },
  form: { type: Object, required: true },
  name: { type: String, required: false },
  validation: { type: Object as PropType<Validation>, required: false },
  disabled: { type: Boolean, required: false, default: false },
})

const el = ref(null! as HTMLElement)
const easyMDE = ref<EasyMDE>(null)

// watch(() => props.form[props.code], (newVal, oldVal) => {
//   if (easyMDE.value && !newVal) {
//     easyMDE.value.value("")
//   }
// })

onMounted(() => {
  easyMDE.value = new EasyMDE({
    element: el.value,
    status: false,
    autoRefresh: { delay: 250 },
    autoDownloadFontAwesome: false,
  })
  easyMDE.value.codemirror.on("update", () => {
    props.form[props.code] = easyMDE.value.value()
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
