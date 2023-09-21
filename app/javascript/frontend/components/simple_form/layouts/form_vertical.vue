<template>
  <form class="x-form-vertical">
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
import { ControlOptions, WrapperOptions } from '../helper'
import VerticalGroup from './VerticalGroup.vue'
import group from './group.vue'

const slots = useSlots()

const props = defineProps<{
  former: Former<Record<string, any>>
  default_wrapper_options?: WrapperOptions
  default_control_options?: ControlOptions
}>()

provide("GroupComponent", VerticalGroup)
provide("former", props.former)
provide("default_wrapper_options", ref(<WrapperOptions>{ ...props.default_wrapper_options }))
provide("default_control_options", ref(<ControlOptions>{ ...props.default_control_options }))
</script>