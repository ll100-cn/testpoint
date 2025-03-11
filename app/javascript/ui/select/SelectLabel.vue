<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectLabel, type SelectLabelProps } from 'radix-vue'
import { cn } from '../utils'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
const presenterConfig = relaySelectPresenterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectLabel :class="cn(
    presenter.label(presenterConfig),
    props.class,
  )">
    <slot />
  </SelectLabel>
</template>
