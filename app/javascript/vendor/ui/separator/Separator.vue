<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Separator, type SeparatorProps } from 'radix-vue'
import { cn } from '../utils'
import * as SeparatorPresenters from './presets'
import { provideSeparatorPresenter, relaySeparatorPreseterConfig, type SeparatorPresenter, type SeparatorPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof SeparatorPresenters | SeparatorPresenter
  label?: string
}

const props = withDefaults(defineProps< SeparatorProps & Props & Partial<SeparatorPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relaySeparatorPreseterConfig(props)
const presenter = provideSeparatorPresenter(computed(() => {
  return typeof props.preset == 'string' ? SeparatorPresenters[props.preset] : props.preset
}))



const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

</script>

<template>
  <Separator v-bind="delegatedProps" :class=" cn(presenter.root(presenterConfig), props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full', props.class, ) ">
    <span v-if="props.label" :class="cn(presenter.label(presenterConfig), props.orientation === 'vertical' ? 'w-[1px] px-1 py-2' : 'h-[1px] py-1 px-2')" >{{ props.label }}</span>
  </Separator>
</template>
