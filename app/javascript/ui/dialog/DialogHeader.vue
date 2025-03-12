<script setup lang="ts">
import { useSlots, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayDialogPresenterConfig, useDialogPresenter, type DialogPresenterConfig } from './types'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
})

const presenterConfig = relayDialogPresenterConfig(props)
const presenter = useDialogPresenter()
</script>

<template>
  <div :class="cn(presenter.header(presenterConfig), props.class)">
    <div data-role-inner>
      <slot />
    </div>

    <template v-if="$slots.actions">
      <div data-role-actions><slot name="actions"></slot></div>
    </template>
  </div>
</template>
