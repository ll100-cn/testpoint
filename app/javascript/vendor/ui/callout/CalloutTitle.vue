<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '$vendor/ui/utils'
import { relayCalloutPreseterConfig, useCalloutPresenter, type CalloutPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<CalloutPresenterConfig>>(), {
})

const presenterConfig = relayCalloutPreseterConfig(props)
const presenter = useCalloutPresenter()
</script>

<template>
  <h5 :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </h5>
</template>
