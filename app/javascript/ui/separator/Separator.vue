<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Separator, type SeparatorProps } from 'reka-ui'
import { cn } from '../utils'
import { provideSeparatorPresenter, relaySeparatorPresenterConfig, type SeparatorPresenter, type SeparatorPresenterConfig, useSeparatorPresenters } from './types';

const presenters = useSeparatorPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | SeparatorPresenter
  label?: string
}

const props = withDefaults(defineProps< SeparatorProps & Props & Partial<SeparatorPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relaySeparatorPresenterConfig(props)
const presenter = provideSeparatorPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
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
