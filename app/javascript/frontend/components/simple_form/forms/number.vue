<template>
  <input v-model="form[code]" type="number" class="form-control" :name="name ?? code" :disabled="disabled" :class="{'is-invalid': validation?.isInvaild() }">
</template>

<script setup lang="ts">
import { Validation } from '@/models';
import { PropType } from 'vue';

const props = defineProps({
  label: { type: String, required: false },
  code: { type: String, required: true },
  form: { type: Object, required: true },
  name: { type: String, required: false },
  validation: { type: Object as PropType<Validation>, required: false },
  disabled: { type: Boolean, required: false, default: false },
})
</script>
