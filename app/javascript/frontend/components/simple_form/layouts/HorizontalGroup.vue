<template>
  <div class="x-form-group" :class="{ 'has-errors': validation.isInvaild() }">
    <div class="row align-items-start">
      <div v-bind="label_wrap_attrs">
        <div class="row align-items-center justify-content-end">
          <slot name="label-prepend" />
          <label :for="code" class="col-form-label col-auto px-0" v-bind="label_attrs">
            <span v-if="label">{{ label }}</span>
          </label>
        </div>
      </div>

      <div class="col" v-bind="control_wrap_attrs">
        <slot name="default" />
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
import { type GroupProps } from "../helper"

interface Props extends GroupProps {
  label?: string
  validation?: Validation
  hint?: string
  code?: string
}

const props = defineProps<Props>()

const validation = helper.validation(props)
const code = computed(() => props.code ?? validation.value.code)

const label_wrap_attrs = computed(() => {
  const attrs: any = { class: [] }

  if (props.label_wrap_class) {
    attrs.class.push(props.label_wrap_class)
  }

  return attrs
})

const label_attrs = helper.buildLabelAttrs(props)

const control_wrap_attrs = computed(() => {
  const attrs: any = { class: [] }

  if (props.control_wrap_class) {
    attrs.class.push(props.control_wrap_class)
  }

  return attrs
})

</script>
