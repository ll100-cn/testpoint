<template>
  <form class="horizontal-form">
    <slot></slot>

    <template v-if="slots.actions">
      <hr>

      <group :validation="new Validation()">
        <div class="x-actions">
          <slot name="actions" />
        </div>
      </group>
    </template>
  </form>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { provide, ref, useSlots } from 'vue'
import Former from '../Former'
import HorizontalGroup from './HorizontalGroup.vue'
import group from './group.vue'
import { ControlOptions, LabelOptions, WrapperOptions } from '../helper'

const slots = useSlots()

const props = defineProps<{
  former: Former<any>
  default_wrapper_options?: WrapperOptions
  default_label_options?: LabelOptions
  default_control_options?: ControlOptions
}>()

provide("GroupComponent", HorizontalGroup)
provide("former", props.former)
provide("default_wrapper_options", ref(<WrapperOptions>{ ...props.default_wrapper_options }))
provide("default_label_options", ref(<LabelOptions>{ wrap_class: "col-2", ...props.default_label_options }))
provide("default_control_options", ref(<ControlOptions>{ ...props.default_control_options }))
</script>