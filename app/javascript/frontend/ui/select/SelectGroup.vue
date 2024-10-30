<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectGroup } from 'radix-vue'
import { cn } from '@/ui/utils'
import { relaySelectPreseterConfig, useSelectPresenter, type SelectPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig>>(), {})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const presenterConfig = relaySelectPreseterConfig(props)
const presenter = useSelectPresenter()
</script>

<template>
  <SelectGroup :class="cn(presenter.group(presenterConfig), props.class)" v-bind="delegatedProps">
    <slot />
  </SelectGroup>
</template>
