<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { type AlertPresenterConfig, relayAlertPresenterConfig, useAlertPresenter } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertPresenterConfig>>(), {
})

const presenterConfig = relayAlertPresenterConfig(props)
const presenter = useAlertPresenter()
</script>

<template>
  <div :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </div>
</template>
