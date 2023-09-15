<template>
  <div class="container mb-3" :class="{ 'has-errors': validation.isInvaild() }">
    <div class="row align-items-start">
      <div class="row align-items-center" v-bind="label_wrap_attrs">
        <slot name="label-prepend" :code="code" />
        <label :for="code" class="col-form-label col text-end text-nowrap" v-bind="label_attrs">
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
import { Validation } from "@/models"
import _ from "lodash"
import { computed } from "vue"
import * as helper from '../helper'
import { GroupProps, LabelOptions } from "../helper"

interface Props extends GroupProps {
  label?: string
  validation?: Validation
  disableds?: any
  hint?: string
}

const props = defineProps<Props>()

const validation = helper.validation(props)
const code = computed(() => validation.value.code)
const disabled = computed(() => {
//   if (code.value) {
//     return props.disableds[code.value]
//   }
  return false
})

const label_wrap_attrs = computed(() => {
  const attrs: any = { class: [] }

  if (props.label_options.wrap_class) {
    attrs.class.push(props.label_options.wrap_class)
  }

  return attrs
})

const label_attrs = helper.buildLabelAttrs(props)

</script>
