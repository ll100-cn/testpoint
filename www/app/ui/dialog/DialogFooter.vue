<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayDialogPresenterConfig, useDialogPresenter } from './types'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const presenterConfig = relayDialogPresenterConfig()
const presenter = useDialogPresenter()
</script>

<template>
  <div :class="cn(presenter.footer(presenterConfig), props.class)">
    <slot />
  </div>
</template>
