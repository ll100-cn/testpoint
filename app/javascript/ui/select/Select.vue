<script setup lang="ts">
import type { SelectRootEmits } from 'radix-vue'
import { SelectRoot, useForwardPropsEmits } from 'radix-vue'
import { provideSelectPresenter, relaySelectPreseterConfig, type SelectPresenter, type SelectPresenterConfig, useSelectPresenters } from './types'
import { computed, type HTMLAttributes } from 'vue';

const presenters = useSelectPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | SelectPresenter
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig>>(), {
  preset: 'standard'
})

const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const presenterConfig = relaySelectPreseterConfig(props)
const presenter = provideSelectPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
