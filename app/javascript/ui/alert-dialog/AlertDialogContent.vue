<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cn } from '$ui/utils'
import {
  AlertDialogContent,
  type AlertDialogContentEmits,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { relayAlertDialogPreseterConfig, useAlertDialogPresenter, type AlertDialogPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertDialogPresenterConfig>>(), {
})

const emits = defineEmits<AlertDialogContentEmits>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const presenterConfig = relayAlertDialogPreseterConfig(props)
const presenter = useAlertDialogPresenter()
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay class="
      fixed inset-0 z-50 bg-black/80
      data-[state=open]:animate-in data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    " />
    <AlertDialogContent v-bind="forwarded" :class="cn(presenter.content(presenterConfig), props.class)">
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
