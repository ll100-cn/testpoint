<template>
  <form class="x-form-inline row g-3">
    <slot></slot>

    <template v-if="slots.actions">
      <hr>

      <div class="x-actions">
        <slot name="actions" />
      </div>
    </template>
  </form>
</template>

<script setup lang="ts">
import { provide, ref, useSlots } from 'vue'
import Former from '../Former'
import { type ControlConfig, type WrapperConfig } from '../helper'
import InlineGroup from './InlineGroup.vue'

const slots = useSlots()

const props = defineProps<{
  former: Former<Record<string, any>>
  default_wrapper_config?: WrapperConfig
  default_control_config?: ControlConfig
}>()

provide("GroupComponent", InlineGroup)
provide("former", props.former)
provide("default_wrapper_config", ref(<WrapperConfig>{ ...props.default_wrapper_config }))
provide("default_control_config", ref(<ControlConfig>{ ...props.default_control_config }))
</script>