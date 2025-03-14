<template>
  <slot></slot>
</template>

<script setup lang="ts" generic="T extends object">
import _ from 'lodash'
import { computed, provide, ref } from 'vue'
import { type NestedKeyOf, ControlValueKey, useFormer } from './types'
import Validation from './Validation'

type Props = {
  path: NestedKeyOf<T>
}

const emit = defineEmits<{
  'update:controlValue': [any]
}>()
const props = defineProps<Props>()

const former = useFormer()
const controlValue = computed({
  get: () => _.get(former?.form, props.path!),
  set: (value) => {
    const oldValue = _.get(former?.form, props.path!)
    if (value !== oldValue) {
      _.set(former?.form ?? {}, props.path!, value)
      emit('update:controlValue', value)
    }
  }
})

provide(ControlValueKey, controlValue)
</script>
