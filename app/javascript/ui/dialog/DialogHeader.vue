<script setup lang="ts">
import { useSlots, type HTMLAttributes } from 'vue'
import { cn } from '$ui/utils'
import { relayDialogPreseterConfig, useDialogPresenter, type DialogPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']

}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
})

const slots = useSlots()
const presenterConfig = relayDialogPreseterConfig(props)
const presenter = useDialogPresenter()
</script>

<template>
  <div :class="cn(presenter.header(presenterConfig), props.class)">
    <slot />

    <template v-if="slots.actions">
      <div class="ms-auto"><slot name="actions"></slot></div>
    </template>
  </div>
</template>
