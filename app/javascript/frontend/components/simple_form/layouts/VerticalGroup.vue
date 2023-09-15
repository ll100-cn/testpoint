<template>
  <div :class="{ 'has-errors': validation.isInvaild() }">
    <div class="row align-items-center">
      <slot name="label-prepend" :code="code" />
      <label v-if="label" :for="code" class="col-form-label col text-nowrap py-0" v-bind="label_attrs">
        <span>{{ label }}</span>
      </label>
    </div>

    <div class="">
      <slot name="default" :code="code" />
      <div v-if="validation?.isInvaild()" class="invalid-feedback">{{ _.get(validation, 'messages', []).join(', ') }}</div>
      <small v-if="hint" class="form-text text-body-secondary">{{ hint }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash"
import { computed } from "vue"
import * as helper from '../helper'
import { Validation } from "@/models"
import { GroupProps, LabelOptions, WrapperOptions } from "../helper"

interface Props extends GroupProps {
  label?: string
  validation?: Validation
  disableds?: any
  hint?: string
}

const props = defineProps<Props>()

const validation = helper.validation(props)
const code = computed(() => validation.value.code)

const label_attrs = helper.buildLabelAttrs(props)

</script>
