<script setup lang="ts">
import { cn, omitProps } from '../utils'
import { SelectSeparator, useForwardProps, type SelectSeparatorProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const presenterConfig = relaySelectPresenterConfig()
const presenter = useSelectPresenter()

const forwarded = useForwardProps(computed(() =>
  omitProps(props, 'class')
))
</script>

<template>
  <SelectSeparator v-bind="forwarded" :class="cn(presenter.separator(presenterConfig), props.class)" />
</template>
