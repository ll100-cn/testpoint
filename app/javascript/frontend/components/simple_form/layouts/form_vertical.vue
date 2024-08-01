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
import { type ControlConfig, type WrapperConfig } from '../helper'
import VerticalGroup from './VerticalGroup.vue'
import group from './group.vue'

const slots = useSlots()

const props = defineProps<{
  former: Former<Record<string, any>>
  default_wrapper_config?: WrapperConfig
  default_control_config?: ControlConfig
}>()

provide("GroupComponent", VerticalGroup)
provide("former", props.former)
provide("default_wrapper_config", ref(<WrapperConfig>{ ...props.default_wrapper_config }))
provide("default_control_config", ref(<ControlConfig>{ ...props.default_control_config }))
</script>