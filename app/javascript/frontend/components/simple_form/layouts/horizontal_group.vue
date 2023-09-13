<template>
  <div class="container mb-3">
    <div class="row align-items-start">
      <div class="row align-items-center" :class="[{ 'has-errors': validation?.isInvaild() }, label_class]">
        <slot name="label-prepend" :code="code" />
        <label :for="code" class="col-form-label col text-end text-nowrap">
          <span v-if="label">{{ label }}</span>
        </label>
      </div>

      <div class="col">
        <slot name="default" :code="code" :validation="validation" :disabled="disabled" />
        <div v-if="validation?.isInvaild()" class="invalid-feedback">{{ _.get(validation, 'messages', []).join(', ') }}</div>
        <small v-if="hint" class="form-text text-body-secondary">{{ hint }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue"
import _ from "lodash"

import { Validation } from "@/models"

const props = defineProps({
  label: { type: String, required: false },
  validation: { type: Object as PropType<Validation>, required: false },
  disableds: { type: Object, required: false, default: () => ({}) },
  hint: { type: String, required: false },
  label_class: { type: String, default: "col-3" }
})

const code = computed(() => props.validation?.code)
const disabled = computed(() => {
  if (code.value) {
    return props.disableds[code.value]
  }
  return false
})

</script>
