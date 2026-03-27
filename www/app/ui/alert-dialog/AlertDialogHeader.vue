<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { type AlertDialogPresenter, type AlertDialogPresenterConfig, relayAlertDialogPresenterConfig, useAlertDialogPresenter } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
})

const presenterConfig = relayAlertDialogPresenterConfig()
const presenter = useAlertDialogPresenter()
</script>

<template>
  <div :class="cn(presenter.header(presenterConfig), props.class)">
    <slot />
  </div>
</template>
