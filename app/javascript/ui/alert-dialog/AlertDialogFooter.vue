<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { relayAlertDialogPreseterConfig, useAlertDialogPresenter, type AlertDialogPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
})

const presenterConfig = relayAlertDialogPreseterConfig(props)
const presenter = useAlertDialogPresenter()
</script>

<template>
  <div :class="cn(presenter.footer(presenterConfig), props.class)">
    <slot />
  </div>
</template>
