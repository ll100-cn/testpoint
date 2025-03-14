<template>
  <div :class="cn('group', presenter.group(presenterConfig))" v-bind="{ ...groupAttrs }">
    <slot name="prepend"></slot>
    <label v-if="label || label === ''" :class="cn(presenter.label(presenterConfig))" :for="controlId">{{ label }}</label>

    <div :class="cn(presenter.control(presenterConfig))">
      <slot></slot>
      <div v-if="validation.state == 'invalid'" :class="cn('', presenter.error(presenterConfig))">{{ validation.messages[0] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends object">
import _ from 'lodash'
import { computed, provide, useId } from 'vue'
import { cn } from '../utils'
import { ControlValueKey, provideControlId, relayFormPresenterConfig, useFormPresenter, useFormer, type FormPresenterConfig, type NestedKeyOf } from './types'
import Validation from './Validation'

type Props = {
  label?: string | false
  validation?: Validation
  path?: NestedKeyOf<T>
}

const props = defineProps<Props & Partial<FormPresenterConfig>>()
const presenterConfig = relayFormPresenterConfig(props)
const presenter = useFormPresenter()
const controlId = provideControlId(useId())
const validation = computed(() => {
  if (props.validation) {
    return props.validation
  }

  if (props.path) {
    const former = useFormer()
    const formerValidation = former?.validator.get(props.path)
    if (formerValidation) {
      return formerValidation
    }
  }

  return new Validation()
})

if (props.path) {
  const former = useFormer()
  provide(ControlValueKey, computed({
    get: () => _.get(former?.form, props.path!),
    set: (value) => _.set(former?.form ?? {}, props.path!, value)
  }))
}

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
