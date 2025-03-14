<script setup lang="ts" generic="T">
import { type HTMLAttributes, computed } from 'vue'
import { CheckboxRoot, RadioGroupIndicator, RadioGroupItem, type RadioGroupItemProps, useForwardProps } from 'reka-ui'
import { provideInputPresenter, relayInputPresenterConfig, useInputPresenters, type InputPresenter, type InputPresenterConfig } from './types'
import { cn } from '../utils'
import Icon from './Icon.vue'

const presenters = useInputPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | InputPresenter
  value?: T
}

const props = withDefaults(defineProps<Props & Partial<InputPresenterConfig> & RadioGroupItemProps>(), {
  preset: 'standard'
})

const modelValue = defineModel<T | null>()
const checked = computed({
  get() { return modelValue.value === props.value },
  set() { modelValue.value = props.value },
})

const presenterConfig = relayInputPresenterConfig(props)
const presenter = provideInputPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const forwarded = useForwardProps(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}))
</script>

<template>
  <CheckboxRoot :class="cn(presenter.radio(presenterConfig), props.class)" v-model="checked">
    <span data-part-indicator>
      <Icon v-if="checked" icon="tabler:point-filled" />
    </span>
  </CheckboxRoot>
</template>
