<template>
  <div class="x-form-group" :class="{ 'has-errors': validation.isInvaild() }">
    <div class="row align-items-start">
      <div class="row col-auto align-items-center">
        <slot name="label-prepend" />
        <label v-if="label" :for="code" class="col-form-label col text-nowrap py-0" v-bind="label_attrs">
          <span>{{ label }}</span>
        </label>
      </div>

      <div class="col-12" v-bind="control_wrap_attrs">
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
import { GroupProps } from "../helper"

interface Props extends GroupProps {
  label?: string
  validation?: Validation
  disableds?: any
  hint?: string
  code?: string
}

const props = defineProps<Props>()

const validation = helper.validation(props)
const code = computed(() => props.code ?? validation.value.code)

const label_attrs = helper.buildLabelAttrs(props)

const control_wrap_attrs = computed(() => {
  const attrs: any = { class: [] }

  if (props.control_wrap_class) {
    attrs.class.push(props.control_wrap_class)
  }

  return attrs
})

</script>
