<template>
  <form class="inline-form row g-3">
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
import InlineGroup from './InlineGroup.vue'
import { WrapperOptions, LabelOptions, ControlOptions } from '../helper'

const slots = useSlots()

const props = defineProps<{
  former: Former<Record<string, any>>
  default_wrapper_options?: WrapperOptions
  default_label_options?: LabelOptions
  default_control_options?: ControlOptions
}>()

provide("GroupComponent", InlineGroup)
provide("former", props.former)
provide("default_wrapper_options", ref(<WrapperOptions>{ ...props.default_wrapper_options }))
provide("default_label_options", ref(<LabelOptions>{ ...props.default_label_options }))
provide("default_control_options", ref(<ControlOptions>{ ...props.default_control_options }))
</script>