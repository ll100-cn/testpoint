<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { Cross2Icon } from '@radix-icons/vue'
import { cn } from '@/ui/utils'
import { relayDialogPreseterConfig, useDialogPresenter, type DialogPresenterConfig } from './types';

interface Props {
  class?: HTMLAttributes['class']
  closeable?: boolean
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
  closeable: true
})

const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const presenterConfig = relayDialogPreseterConfig(props)
const presenter = useDialogPresenter()
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="
      fixed inset-0 z-50 bg-black/80
      data-[state=open]:animate-in data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    " />
    <DialogContent v-bind="forwarded" :class="cn(presenter.content(presenterConfig), props.class)">
      <slot></slot>

      <DialogClose v-if="closeable" class="
        absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity
        hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground
      ">
        <Cross2Icon class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
