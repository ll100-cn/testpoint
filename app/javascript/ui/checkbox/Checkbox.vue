<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '$ui/utils'
import { provideCheckboxPresenter, relayCheckboxPresenterConfig, useCheckboxPresenter, useCheckboxPresenters, type CheckboxPresenter, type CheckboxPresenterConfig } from './types'

const presenters = useCheckboxPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | CheckboxPresenter
}

const props = withDefaults(defineProps<Props & Partial<CheckboxPresenterConfig> & CheckboxRootProps>(), {
  preset: 'standard'
})

const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const presenterConfig = relayCheckboxPresenterConfig(props)
const presenter = provideCheckboxPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <CheckboxRoot v-bind="forwarded" :class="cn(presenter.root(presenterConfig), props.class)">
    <CheckboxIndicator :class="cn(presenter.indicator(presenterConfig), props.class)">
      <slot>
        <CheckIcon class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
