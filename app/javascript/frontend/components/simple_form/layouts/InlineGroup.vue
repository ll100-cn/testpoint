<template>
  <div class="col-auto d-flex" :class="{ 'has-errors': validation.isInvaild() }">
    <label v-if="label" :for="code" class="col-form-label col text-end text-nowrap me-1" v-bind="label_attrs">{{ label }}</label>

    <div class="d-flex align-items-center">
      <slot name="default" :code="code" />
      <div v-if="validation?.isInvaild()" class="invalid-feedback">{{ _.get(validation, 'messages', []).join(', ') }}</div>
      <small v-if="hint" class="form-text text-body-secondary">{{ hint }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import _ from "lodash"
import * as helper from '../helper'
import { Validation } from '@/models'
import { GroupProps, LabelOptions, WrapperOptions } from '../helper'

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
