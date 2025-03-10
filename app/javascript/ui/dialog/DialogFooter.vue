<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { relayDialogPreseterConfig, useDialogPresenter, type DialogPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
})

const presenterConfig = relayDialogPreseterConfig(props)
const presenter = useDialogPresenter()
</script>

<template>
  <div :class="cn(presenter.footer(presenterConfig), props.class)">
    <slot />
  </div>
</template>
