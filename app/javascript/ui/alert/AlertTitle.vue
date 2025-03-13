<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { type AlertPresenterConfig, relayAlertPresenterConfig, useAlertPresenter } from './types'
import { Primitive, useForwardProps, type PrimitiveProps } from 'reka-ui'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<AlertPresenterConfig>>(), {
  as: 'h3'
})

const presenterConfig = relayAlertPresenterConfig(props)
const presenter = useAlertPresenter()

const forwarded = useForwardProps(computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
}))
</script>

<template>
  <Primitive v-bind="forwarded" :class="cn(presenter.title(presenterConfig), props.class)">
    <slot />
  </Primitive>
</template>
