<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { provideAlertPresenter, relayAlertPreseterConfig, useAlertPresenter, type AlertPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertPresenterConfig>>(), {
})

const presenterConfig = relayAlertPreseterConfig(props)
const presenter = useAlertPresenter()
</script>

<template>
  <div :class="cn(presenter.description(presenterConfig), props.class)">
    <slot />
  </div>
</template>
