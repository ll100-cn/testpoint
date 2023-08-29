<template>
  <select v-model="form[code]" class="form-select" :class="{'is-invalid': validation?.isInvaild()}" :disabled="disabled" @change="emit('change', $event)">
    <option v-if="includeBlank" value="" />
    <template v-if="(collection instanceof Array)">
      <option v-for="item in collection" :key="item[valueMethod]" :value="item[valueMethod]">
        {{ item[labelMethod] }}
      </option>
    </template>
    <template v-else>
      <optgroup v-for="(list, key) in collection" :key="key" :label="key">
        <option v-for="item in list" :key="item[valueMethod]" :value="item[valueMethod]">
          {{ item[labelMethod] }}
        </option>
      </optgroup>
    </template>
  </select>
</template>

<script setup lang="ts">
import { Validation } from '@/models';

const props = withDefaults(defineProps<{
  label?: string
  code: string
  name?: string
  form: object
  validation?: Validation
  disabled?: boolean
  collection: object
  labelMethod: string
  valueMethod: string
  includeBlank?: boolean
  required?: boolean
}>(), {
  disabled: false,
  includeBlank: false,
  required: false,
})

const emit = defineEmits<{
  change: [evenvt: Event]
}>()

</script>
