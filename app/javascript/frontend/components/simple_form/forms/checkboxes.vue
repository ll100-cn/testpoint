<template>
  <div class="pt-2">
    <input type="hidden" :name="name ?? code" value="" :disabled="disabled">
    <div v-for="item in collection" class="form-check form-check-inline">
      <input v-model="form[code]" class="form-check-input" type="checkbox" :value="item[valueMethod]" :name="name ?? code" :disabled="disabled">
      <label class="form-check-label">{{ item[labelMethod] }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models';
import { PropType } from 'vue';

const props = defineProps({
  label: { type: String, required: false },
  code: { type: String, required: true },
  name: { type: String, required: false },
  form: { type: Object, required: true },
  validations: { type: Object as PropType<Validation>, required: false },
  disabled: { type: Boolean, required: false, default: false },
  collection: { type: Array, required: true },
  labelMethod: { type: String, required: true },
  valueMethod: { type: String, required: true },
})

</script>
