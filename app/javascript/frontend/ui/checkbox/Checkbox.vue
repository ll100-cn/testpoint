<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { CheckboxRootEmits } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '@/ui/utils'
import { relayCheckboxPreseterConfig, useCheckboxPresenter, type CheckboxPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<CheckboxPresenterConfig>>(), {
})

const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const presenterConfig = relayCheckboxPreseterConfig(props)
const presenter = useCheckboxPresenter()
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
