<script setup lang="ts">
import { computed, type HTMLAttributes, type VNode } from 'vue'
import { cn } from '../utils'
import { injectSelectRootContext, SelectLabel, type AcceptableValue, type SelectLabelProps } from 'reka-ui'
import { relaySelectPresenterConfig, useSelectContext, useSelectPresenter } from './types'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()

const presenterConfig = relaySelectPresenterConfig()
const presenter = useSelectPresenter()
</script>

<template>
  <SelectLabel :class="cn(presenter.label(presenterConfig), props.class)">
    <slot />
  </SelectLabel>
</template>
