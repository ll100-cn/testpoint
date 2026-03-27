<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '../utils'
import { relayCalloutPresenterConfig, useCalloutPresenter, type CalloutPresenterConfig } from './types';
import { Primitive, useForwardProps, type PrimitiveProps } from 'reka-ui'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & Partial<CalloutPresenterConfig>>(), {
  as: 'h4'
})

const presenterConfig = relayCalloutPresenterConfig(props)
const presenter = useCalloutPresenter()

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
