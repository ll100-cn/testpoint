<template>
  <component :is="GroupComponent" v-bind="{ ...props, options, label_options }">
    <template #label-prepend="slot_attrs" v-if="slots['label-prepend']"><slot name="label-prepend" v-bind="slot_attrs" /></template>
    <template #default="slot_attrs" v-if="slots['default']"><slot name="default" v-bind="slot_attrs" /></template>
  </component>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import _ from 'lodash'
import { DefineComponent, Ref, computed, inject, provide, useSlots } from 'vue'
import Former from '../Former'
import { ControlOptions, LabelOptions, WrapperOptions } from '../helper'


interface Props {
  validation?: Validation
  code?: string

  label?: string
  label_options?: LabelOptions

  hint?: string
  disableds?: any
  options?: WrapperOptions
}

const slots = useSlots()
const props = defineProps<Props>()

const GroupComponent = inject("GroupComponent") as DefineComponent
const former = inject('former') as Former<Record<string, any>>

const validation = computed(() => {
  return props.validation ?? former.validations.disconnect(props.code!)
})
provide("validation", validation)

const model_value = computed({
  get: () => { return _.get(former.form, props.code) },
  set: (new_value) => { _.set(former.form, props.code, new_value) }
})
provide("model_value", model_value)

const default_wrapper_options = inject("default_wrapper_options") as Ref<WrapperOptions>
const options = computed(() => {
  return _.merge(<WrapperOptions>{ size: 'default' }, default_wrapper_options.value, props.options)
})

const default_label_options = inject("default_label_options") as Ref<LabelOptions>
const label_options = computed(() => {
  return _.merge(<LabelOptions>{}, default_label_options.value, props.label_options)
})

const default_control_options = inject('default_control_options') as Ref<ControlOptions>
const control_options = computed(() => {
  return <ControlOptions>{ size: options.value.size, ...default_control_options.value }
})
provide("default_control_options", control_options)

</script>