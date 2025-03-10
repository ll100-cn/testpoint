<script setup lang="ts">
import { cn } from '$ui/utils';
import { AlertDialogTitle } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import { relayAlertDialogPreseterConfig, useAlertDialogPresenter, type AlertDialogPresenterConfig } from './types';

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
})

const presenterConfig = relayAlertDialogPreseterConfig(props)
const presenter = useAlertDialogPresenter()
</script>

<template>
  <AlertDialogTitle v-bind="delegatedProps" :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </AlertDialogTitle>
</template>
