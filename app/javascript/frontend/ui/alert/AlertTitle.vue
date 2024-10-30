<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { relayAlertPreseterConfig, useAlertPresenter, type AlertPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertPresenterConfig>>(), {
})

const presenterConfig = relayAlertPreseterConfig(props)
const presenter = useAlertPresenter()
</script>

<template>
  <h5 :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </h5>
</template>
