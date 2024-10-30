<script setup lang="ts">
import { computed, inject, ref, useAttrs, type HTMLAttributes, type Ref } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { provideButtonPresenter, relayButtonPreseterConfig, useButtonPresenter, type ButtonPresenter, type ButtonPresenterConfig } from './types'
import { cn } from '@/ui/utils'
import { RouterLink } from 'vue-router'
import * as ButtonPresenters from './presets'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  preset?: keyof typeof ButtonPresenters | ButtonPresenter
  inherit?: boolean
}

const props = withDefaults(defineProps<Props & Partial<ButtonPresenterConfig>>(), {
  as: 'button',
  inherit: false,
  preset: 'standard'
})

const presenterConfig = relayButtonPreseterConfig(props)
let presenter = null! as Ref<ButtonPresenter>
if (props.inherit) {
  presenter = useButtonPresenter()
} else {
  presenter = provideButtonPresenter(computed(() => {
    return typeof props.preset == 'string' ? ButtonPresenters[props.preset] : props.preset
  }))
}

const attrs = useAttrs()
const as = computed(() => {
  if (attrs.disabled) {
    return 'button'
  }

  if (attrs.href) {
    return "a"
  }

  if (attrs.to) {
    return RouterLink
  }

  return props.as
})
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(presenter.root(presenterConfig), props.class)">
    <slot></slot>
  </Primitive>
</template>
