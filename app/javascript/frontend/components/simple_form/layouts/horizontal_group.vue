<template>
  <div class="mb-3">
    <div class="row align-items-center" :class="{ 'has-errors': validation?.isInvaild() }">
      <slot name="label-prepend" :code="code" />
      <label v-if="label" :for="code" class="col-form-label col text-nowrap py-0">
        <span>{{ label }}</span>
      </label>
    </div>

    <div class="">
      <slot name="default" :code="code" :validation="validation" :disabled="disableds[code]" />
      <div v-if="validation?.isInvaild()" class="invalid-feedback">{{ _.get(validation, 'messages', []).join(', ') }}</div>
      <small v-if="hint" class="form-text text-body-secondary">{{ hint }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash"
import { computed } from "vue"

import { Validation } from "@/models"

const props = withDefaults(defineProps<{
  label?: string
  validation?: Validation
  disableds?: any
  hint?: string
}>(), {
  disableds: {}
})

const code = computed(() => props.validation?.code)

</script>
