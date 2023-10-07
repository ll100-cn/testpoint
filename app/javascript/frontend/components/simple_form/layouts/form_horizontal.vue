<template>
  <form class="x-form-horizontal">
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
import { ControlConfig, WrapperConfig } from '../helper'
import HorizontalGroup from './HorizontalGroup.vue'
import group from './group.vue'

const slots = useSlots()

const props = defineProps<{
  former: Former<any>
  default_wrapper_config?: WrapperConfig
  default_control_config?: ControlConfig
}>()

provide("GroupComponent", HorizontalGroup)
provide("former", props.former)
provide("default_wrapper_config", ref(<WrapperConfig>{ label_wrap_class: 'col-2', ...props.default_wrapper_config }))
provide("default_control_config", ref(<ControlConfig>{ ...props.default_control_config }))
</script>