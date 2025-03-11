<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectSeparator, type SelectSeparatorProps } from 'radix-vue'
import { cn } from '../utils'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const presenterConfig = relaySelectPresenterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectSeparator v-bind="delegatedProps" :class="cn(
    presenter.separator(presenterConfig),
    props.class,
  )" />
</template>
