<script setup lang="ts">
import { type HTMLAttributes, computed, useAttrs } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import SelectCaret from '../input1/SelectCaret.vue'
import { cn } from '../utils'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
const presenterConfig = relaySelectPresenterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectTrigger v-bind="{ ...forwardedProps }" :class="cn(props.class)">
    <slot />
    <SelectIcon as-child>
      <SelectCaret />
    </SelectIcon>
  </SelectTrigger>
</template>
