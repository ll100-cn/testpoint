<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { Cross2Icon } from '@radix-icons/vue'
import { cn, type NoUndefined } from '$ui/utils'
import { relayDialogPresenterConfig, useDialogPresenter, type DialogPresenterConfig } from './types'
import type { ComponentProps } from 'vue-component-type-helpers'

interface Props {
  class?: HTMLAttributes['class']
  closeable?: boolean
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
  closeable: true
})

const presenterConfig = relayDialogPresenterConfig(props)
const presenter = useDialogPresenter()

const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmits(computed(() => {
  const { class: _, ...delegated } = props
  return delegated
}) , emits)

type PointerDownOutsideEvent = Parameters<Required<ComponentProps<typeof DialogContent>>['onPointerDownOutside']>[0]
function handlePointerDownOutside(event: PointerDownOutsideEvent) {
  const originalEvent = event.detail.originalEvent;
  const target = originalEvent.target as HTMLElement;
  if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
    event.preventDefault();
  }
}
</script>

<template>
  <DialogPortal>
    <DialogOverlay :class="presenter.overlay(presenterConfig)" />
    <DialogContent
      v-bind="forwarded"
      :class="cn(presenter.content(presenterConfig), props.class)"
      @pointer-down-outside="presenterConfig.scroll === 'body' ? handlePointerDownOutside : undefined"
    >
      <slot></slot>

      <DialogClose v-if="closeable" :class="presenter.closeIcon(presenterConfig)">
        <Cross2Icon />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
