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

const checked = ref(props.value === undefined ? props.defaultValue : props.modelValue)
function onValueChanged(value: boolean | 'indeterminate') {
  emits('update:modelValue', value)
  checked.value = value
}
watch(computed(() => props.modelValue), (value) => {
  checked.value = value
})


const presenterConfig = relayInputPresenterConfig(props)
const presenter = provideInputPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const delegatedProps = computed(() => {
  const { class: _class, modelValue, defaultValue, ...delegated } = props
  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cn(presenter.checkbox(presenterConfig), props.class)" @click.prevent :model-value="checked" @update:model-value="onValueChanged">
    <span data-role-indicator>
      <Icon v-if="checked === 'indeterminate'" icon="tabler:minus" />
      <Icon v-if="checked === true" icon="tabler:check" />
    </span>
  </CheckboxRoot>
</template>
