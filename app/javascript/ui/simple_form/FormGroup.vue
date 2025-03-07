<template>
  <div :class="cn('group', presenter.group(presenterConfig))" v-bind="{ ...groupAttrs }">
    <label v-if="label != null" :class="cn(presenter.label(presenterConfig))" :for="controlId">{{ label }}</label>

    <div class="flex-1">
      <slot></slot>
    </div>

    <div v-if="validation.state == 'invalid'" :class="cn('', presenter.error(presenterConfig))">{{ validation.messages[0] }}</div>
  </div>
</template>

<script setup lang="ts" generic="T extends object">
import _ from 'lodash'
import { provide, computed, ref } from 'vue'
import { relayInjectPreseterConfig, useInjectFormer, ControlConfigKey, ControlValueKey, useFormPresenter } from './types'
import Validation from './Validation'
import { type FormPresenterConfig, type NestedKeyOf } from './types';
import { cn } from '$ui/utils'

interface Props {
  label?: string | false
  validation?: Validation
  path?: NestedKeyOf<T>
}

const props = defineProps<Props & Partial<FormPresenterConfig>>()
const presenterConfig = relayInjectPreseterConfig(props)
const presenter = useFormPresenter()

const controlId = ref(_.uniqueId("form-control-"))
const validation = computed(() => {
  if (props.validation) {
    return props.validation
  }

  if (props.path) {
    const former = useInjectFormer()
    const formerValidation = former?.validator.get(props.path)
    if (formerValidation) {
      return formerValidation
    }
  }

  return new Validation()
})

if (props.path) {
  const former = useInjectFormer()

  provide(ControlValueKey, computed({
    get: () => _.get(former?.form, props.path!),
    set: (value) => _.set(former?.form ?? {}, props.path!, value)
  }))
}

provide(ControlConfigKey, computed(() => {
  return { id: controlId.value, validation: validation.value }
}))


const groupAttrs = computed(() => {
  const attrs = {} as Record<string, any>

  if (validation.value.state == 'valid') {
    attrs['data-state'] = 'valid'
  }

  if (validation.value.state == 'invalid') {
    attrs['data-state'] = 'invalid'
  }

  if (presenterConfig.value.disabled) {
    attrs['data-disabled'] = ''
  }

  return attrs
})
</script>
