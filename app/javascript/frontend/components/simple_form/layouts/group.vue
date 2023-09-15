<template>
  <component :is="GroupComponent" v-bind="{ ...props, validation }">
    <template #label-prepend="slot_attrs" v-if="slots['label-prepend']"><slot name="label-prepend" v-bind="slot_attrs" /></template>
    <template #default="slot_attrs" v-if="slots['default']"><slot name="default" v-bind="slot_attrs" /></template>
  </component>
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { DefineComponent, computed, inject, ref, useSlots, reactive, provide } from 'vue'
import Former from '../Former'
import _ from 'lodash'


interface Props {
  label?: string
  label_class?: string

  validation?: Validation
  code?: string

  hint?: string
  disableds?: any
}

const slots = useSlots()
const props = defineProps<Props>()

const GroupComponent = inject("GroupComponent") as DefineComponent
const former = inject('former') as Former<Record<string, any>>

const validation = computed(() => {
  return reactive(props.validation || former.validations.disconnect(props.code!))
})
provide("validation", validation)

const model_value = computed({
  get: () => { return _.get(former.form, props.code) },
  set: (new_value) => { _.set(former.form, props.code, new_value) }
})
provide("model_value", model_value)
</script>