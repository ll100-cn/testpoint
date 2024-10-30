<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/ui/utils'
import { relayDropdownMenuPreseterConfig, useDropdownMenuPresenter, type DropdownMenuPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DropdownMenuPresenterConfig>>(), {})

const presenterConfig = relayDropdownMenuPreseterConfig(props)
const presenter = useDropdownMenuPresenter()
</script>

<template>
  <span :class="cn(presenter.shortcut(presenterConfig), props.class)">
    <slot />
  </span>
</template>
