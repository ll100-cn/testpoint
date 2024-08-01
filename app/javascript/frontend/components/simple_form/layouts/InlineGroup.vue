<template>
  <div class="x-form-group col-auto d-flex" :class="{ 'has-errors': validation.isInvaild() }">
    <label v-if="label" :for="code" class="col-form-label col text-end text-nowrap me-1" v-bind="label_attrs">{{ label }}</label>

    <div class="d-flex align-items-center">
      <slot name="default" :code="code" />
      <div v-if="validation?.isInvaild()" class="invalid-feedback">{{ _.get(validation, 'messages', []).join(', ') }}</div>
      <small v-if="hint" class="form-text text-body-secondary">{{ hint }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import _ from "lodash"
import { computed } from 'vue'
import * as helper from '../helper'
import { type GroupProps } from '../helper'

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
</script>
