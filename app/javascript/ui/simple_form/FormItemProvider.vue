<template>
  <slot></slot>
</template>

<script setup lang="ts" generic="T extends object">
import _ from 'lodash';
import { computed, provide, ref } from 'vue';
import { type NestedKeyOf, ControlConfigKey, ControlValueKey, useInjectFormer } from './types';
import Validation from './Validation';

type Props = {
  path: NestedKeyOf<T>
}

const emit = defineEmits<{
  'update:controlValue': [any]
}>()
const props = defineProps<Props>()

const controlId = ref(_.uniqueId("form-control-"))
const validation = computed(() => {
  const former = useInjectFormer()
  const formerValidation = former?.validator.get(props.path)
  if (formerValidation) {
    return formerValidation
  }

  return new Validation()
})

const former = useInjectFormer()
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

provide(ControlConfigKey, computed(() => {
  return { id: controlId.value, validation: validation.value }
}))
</script>
