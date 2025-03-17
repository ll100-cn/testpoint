<!--
  SNIP: 33d22c009dfa835af4047fb887798c4d
  FILES:
   - DialogClose.vue
   - DialogContent.vue
   - DialogDescription.vue
   - DialogFooter.vue
   - DialogHeader.vue
   - DialogTitle.vue
   - DialogTrigger.vue
   - types.ts => Dialog-types.ts
   - index.ts => Dialog-index.ts
  CHANGELOG:
   - 2025-03-17 整理代码
-->
<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, useForwardPropsEmits } from 'reka-ui'
import { provideDialogPresenter, relayDialogPresenterConfig, type DialogPresenter, type DialogPresenterConfig, useDialogPresenters } from './types'
import { computed, type HTMLAttributes } from 'vue';

const presenters = useDialogPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | DialogPresenter
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
  preset: 'standard'
})

const presenterConfig = relayDialogPresenterConfig(props)
const presenter = provideDialogPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const emits = defineEmits<DialogRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>
