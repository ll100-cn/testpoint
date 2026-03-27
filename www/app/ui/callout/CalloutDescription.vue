<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { provideCalloutPresenter, relayCalloutPresenterConfig, useCalloutPresenter, type CalloutPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<CalloutPresenterConfig>>(), {
})

const presenterConfig = relayCalloutPresenterConfig(props)
const presenter = useCalloutPresenter()
</script>

<template>
  <div :class="cn(presenter.description(presenterConfig), props.class)">
    <slot />
  </div>
</template>
