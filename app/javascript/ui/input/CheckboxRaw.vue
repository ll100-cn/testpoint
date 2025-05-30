<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import { CheckboxRoot, useForwardProps, useForwardPropsEmits } from 'reka-ui'
import { computed, ref, watch, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { provideInputPresenter, relayInputPresenterConfig, useInputPresenters, type InputPresenter, type InputPresenterConfig } from './types'
import Icon from './Icon.vue'

const presenters = useInputPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | InputPresenter
}

const emits = defineEmits<CheckboxRootEmits>()
const props = withDefaults(defineProps<Props & Partial<InputPresenterConfig> & CheckboxRootProps>(), {
  preset: 'standard'
})

const checkedRaw = defineModel<boolean | 'indeterminate'>()
const checked = computed(() => checkedRaw.value === undefined ? props.defaultValue : checkedRaw.value)
function onValueChanged(value: boolean | 'indeterminate') {
  emits('update:modelValue', value)
}

const presenterConfig = relayInputPresenterConfig(props)
const presenter = provideInputPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const forwarded = useForwardProps(computed(() => {
  const { class: _class, modelValue, defaultValue, ...delegated } = props
  return delegated
}))
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cn(presenter.checkbox(presenterConfig), props.class)" @click.prevent :model-value="checked" @update:model-value="onValueChanged">
    <span data-part-indicator>
      <Icon v-if="checked === 'indeterminate'" icon="tabler:minus" />
      <Icon v-if="checked === true" icon="tabler:check" />
    </span>
  </CheckboxRoot>
</template>
