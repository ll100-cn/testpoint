<script setup lang="ts">
import { cn, omitProps } from '../utils'
import { injectSelectRootContext, SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { relaySelectPresenterConfig, useSelectPresenter } from './types'
import { Icon } from '../input'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props & SelectTriggerProps>(), {
})

const presenterConfig = relaySelectPresenterConfig()
const presenter = useSelectPresenter()

const rootContext = injectSelectRootContext()

const extraAttrs = computed(() => {
  const attrs = {} as HTMLAttributes & { [key: `data-${string}`]: any }

  if (rootContext.multiple.value) {
    attrs['data-multiple'] = ''
  }

  return attrs
})

const forwarded = useForwardProps(computed(() =>
  omitProps(props, 'class')
))
</script>

<template>
  <SelectTrigger v-bind="{ ...forwarded, ...extraAttrs }" :class="cn(presenter.trigger(presenterConfig), props.class)">
    <slot />

    <SelectIcon as-child>
      <Icon icon="tabler:chevron-down" />
    </SelectIcon>
  </SelectTrigger>
</template>
