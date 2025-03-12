<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectGroup, type SelectGroupProps } from 'reka-ui'
import { cn } from '../utils'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const presenterConfig = relaySelectPresenterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectGroup :class="cn(
    presenter.group(presenterConfig),
    props.class,
  )" v-bind="delegatedProps">
    <slot />
  </SelectGroup>
</template>
