<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, useForwardPropsEmits } from 'radix-vue'
import { provideDialogPresenter, relayDialogPreseterConfig, type DialogPresenter, type DialogPresenterConfig, useDialogPresenters } from './types'
import { computed, type HTMLAttributes } from 'vue';

const presenters = useDialogPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset?: keyof typeof presenters | DialogPresenter
}

const props = withDefaults(defineProps<Props & Partial<DialogPresenterConfig>>(), {
  preset: 'standard'
})
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const presenterConfig = relayDialogPreseterConfig(props)
const presenter = provideDialogPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>
