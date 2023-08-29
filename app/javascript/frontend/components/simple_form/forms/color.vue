<template>
  <input ref="el" v-model="form[code]" type="color" class="form-control p-0" :name="name ?? code">
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'

import { Validation } from '@/models'

const props = defineProps({
  label: { type: String, required: false },
  code: { type: String, required: true },
  form: { type: Object, required: true },
  name: { type: String, required: false },
  validation: { type: Object as PropType<Validation>, required: false },
  disabled: { type: Boolean, required: false, default: false },
})

const el = ref<HTMLInputElement>()
</script>
