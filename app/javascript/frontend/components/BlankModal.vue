<template>
  <div ref="el" class="modal fade" tabindex="-1" role="dialog" @keypress.enter="onEnterPress">
    <frame_component ref="frame" v-if="frame_component" v-bind="attrs" @switch="onSwitch" />
  </div>
</template>

<script setup lang="ts">
import BootstrapHelper from '@/lib/BootstrapHelper'
import { type Component, markRaw, nextTick, ref, useAttrs, onMounted, onUnmounted, onBeforeUnmount } from "vue"

const attrs = useAttrs()
const el = ref(null! as HTMLElement)

const emit = defineEmits<{
  switch: [code: string, ...args: any[]]
}>()

type Frame = {
  reset(...args: any[]): void
  confirm?(): void
}

const frame = ref(null! as Frame)
const frame_component = ref(null as Component | null)

function show(a_frame: Component<Frame>, ...args: any[]) {
  frame_component.value = markRaw(a_frame)

  nextTick(() => {
    frame.value.reset(...args)
    BootstrapHelper.modal(el).show()
  })
}

function onSwitch(key: string | Component, ...args: any[]) {
  if (typeof key == 'string') {
    emit('switch', key, ...args)
    return
  }

  frame_component.value = markRaw(key)
  nextTick(() => {
    frame.value.reset(...args)
  })
}

defineExpose({ show })

onMounted(() => {
  el.value.addEventListener('hide.bs.modal', () => {
    frame_component.value = null
  })
})

onBeforeUnmount(() => {
  BootstrapHelper.modal(el).dispose()
})

function onEnterPress(event: Event) {
  if (frame.value.confirm) {
    event.preventDefault()
    frame.value.confirm()
  }
}
</script>
