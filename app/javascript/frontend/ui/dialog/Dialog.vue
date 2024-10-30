<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, useForwardPropsEmits } from 'radix-vue'
import { provideDialogPresenter, relayDialogPreseterConfig, type DialogPresenter, type DialogPresenterConfig } from './types'
import * as DialogPresenters from './presets'
import { computed, type HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof DialogPresenters | DialogPresenter
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
  preset: 'standard'
})
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const presenterConfig = relayDialogPreseterConfig(props)
const presenter = provideDialogPresenter(computed(() => {
  return typeof props.preset == 'string' ? DialogPresenters[props.preset] : props.preset
}))
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>
