<template>
  <Dialog v-model:open="open">
    <frame_component ref="frame" v-if="frame_component" v-bind="attrs" @switch="onSwitch" v-model:open="open" />
  </Dialog>
</template>

<script setup lang="ts">
import { type Component, markRaw, nextTick, ref, useAttrs } from "vue"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '$vendor/ui'

const attrs = useAttrs()

const emits = defineEmits<{
  switch: [code: string, ...args: any[]]
}>()

const open = ref(false)

type Frame = {
  reset(...args: any[]): void
}

const frame = ref(null! as Frame)
const frame_component = ref(null! as Component)

function show(a_frame: Component<Frame>, ...args: any[]) {
  frame_component.value = markRaw(a_frame)

  nextTick(() => {
    frame.value.reset(...args)
    open.value = true
  })
}

function onSwitch(key: string | Component, ...args: any[]) {
  if (typeof key == 'string') {
    emits('switch', key, ...args)
    return
  }

  frame_component.value = markRaw(key)
  nextTick(() => {
    frame.value.reset(...args)
  })
}

defineExpose({ show })
</script>
