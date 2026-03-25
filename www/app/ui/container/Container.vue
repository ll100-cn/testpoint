<script setup lang="ts">
import { computed, withDefaults, type HTMLAttributes } from 'vue';
import { cn } from '../utils';
import { provideContainerPresenter, relayContainerPresenterConfig, type ContainerPresenter, type ContainerPresenterConfig, useContainerPresenters } from './types';

const presenters = useContainerPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | ContainerPresenter
}

const props = withDefaults(defineProps<Props & Partial<ContainerPresenterConfig>>(), {
  preset: 'fluid',
})

const presenterConfig = relayContainerPresenterConfig(props)
const presenter = provideContainerPresenter(computed(() => {
  return typeof props.preset !== 'string' ? props.preset : presenters[props.preset]
}))
</script>

<template>
  <div :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </div>
</template>
