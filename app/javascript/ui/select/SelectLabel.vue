<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectLabel } from 'radix-vue'
import { cn } from '$ui/utils'
import { relaySelectPreseterConfig, useSelectPresenter, type SelectPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig>>(), {})

const presenterConfig = relaySelectPreseterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectLabel :class="cn(presenter.label(presenterConfig), props.class)">
    <slot />
  </SelectLabel>
</template>
