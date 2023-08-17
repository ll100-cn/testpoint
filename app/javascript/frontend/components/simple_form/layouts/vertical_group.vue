<template>
  <div class="container mb-3">
    <div class="row align-items-start">
      <div class="col-3 row align-items-center" :class="{ 'has-errors': validation.isInvaild() }">
        <slot name="label-prepend" :code="code" />
        <label v-if="label" :for="code" class="col-form-label col text-end text-nowrap">
          <span>{{ label }}</span>
        </label>
      </div>

      <div class="col">
        <slot name="default" :code="code" :validation="validation" :disabled="disableds[code]" />
        <div class="invalid-feedback" v-if="validation.isInvaild()">{{ _.get(validation, 'messages', []).join(', ') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import _ from "lodash"

import { Validation } from '@/models';

const props = defineProps({
  label: { type: String, required: false },
  validation: { type: Object as PropType<Validation>, required: true },
  disableds: { type: Object, required: false, default: () => ({}) },
})

const code = computed(() => props.validation.code)

</script>
