<template>
  <select v-model="form[code]" class="form-select" :class="{'is-invalid': validation?.isInvaild()}" :disabled="disabled" @change="emit('create', $event)">
    <option v-if="includeBlank" value="" />
    <option v-for="item in collection" :key="item[valueMethod]" :value="item[valueMethod]">
      {{ item[labelMethod] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { Validation } from '@/models';
import { PropType } from 'vue';

const props = defineProps({
  label: { type: String, required: false },
  code: { type: String, required: true },
  name: { type: String, required: false },
  form: { type: Object, required: true },
  validation: { type: Object as PropType<Validation>, required: false },
  disabled: { type: Boolean, required: false, default: false },
  collection: { type: Array, required: true },
  labelMethod: { type: String, required: true },
  valueMethod: { type: String, required: true },
  includeBlank: { type: Boolean, default: false },
  required: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (e: 'create', event: Event): void,
}>()

</script>
