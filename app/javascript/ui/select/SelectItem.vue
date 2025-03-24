<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { injectSelectRootContext, SelectItem, SelectItemText, SelectItemIndicator, useForwardProps, type AcceptableValue, type SelectItemProps, type SelectItemSelectEvent } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, useId, useTemplateRef, watch, type HTMLAttributes, type InputHTMLAttributes, type VNode } from 'vue'
import { CheckboxRaw, Icon } from '../input'
import { cn, omitProps } from '../utils'
import { modelValueToArray, relaySelectPresenterConfig, useSelectContext, useSelectPresenter } from './types'

type Props = {
  class?: HTMLAttributes['class']
  inset?: boolean
}

const props = withDefaults(defineProps<Props & SelectItemProps>(), {
  inset: false,
})

const presenterConfig = relaySelectPresenterConfig()
const presenter = useSelectPresenter()

const slots = defineSlots<{
  default: (props: { }) => any
}>()

const children = computed(() => slots.default?.({}) ?? [] as VNode[])
const rootContext = injectSelectRootContext()
const context = useSelectContext()
const domId = useId()

watch(computed(() => [ props.value, children.value ]), () => {
  context.registerItem(domId, {
    group: null,
    value: props.value,
    vnodes: children.value,
  })
})

onMounted(() => {
  context.registerItem(domId, {
    group: null,
    value: props.value,
    vnodes: children.value,
  })
})

onBeforeUnmount(() => {
  context.unregisterItem(domId, props.value)
})



const isSelfChecked = computed(() => modelValueToArray(rootContext).includes(props.value))

const isChecked = computed(() => {
  if (isSelfChecked.value) {
    return true
  }

  const domId = context.findItemId(props.value)
  const childValues = context.findChildren(domId).map(it => it.value)
  const modelValueArray = modelValueToArray(rootContext)
  if (childValues.some(it => modelValueArray.includes(it))) {
    return 'indeterminate'
  }

  return false
})

const marker = useTemplateRef('marker')

function onSelect(event: SelectItemSelectEvent<AcceptableValue>) {
  if (!rootContext.multiple.value) {
    return
  }

  if (!marker.value?.contains(event.target as Node)) {
    rootContext.onOpenChange(false)
  }
}


const extraAttrs = computed(() => {
  const attrs = {} as HTMLAttributes & { [key: `data-${string}`]: any }

  if (props.inset) {
    attrs['data-inset'] = ''
  }

  return attrs
})

const forwarded = useForwardProps(computed(() =>
  omitProps(props, 'class')
))
</script>

<template>
  <SelectItem v-bind="{ ...forwarded, ...extraAttrs }" :value="value" :class="cn(presenter.item(presenterConfig), props.class)" @select="onSelect">

    <span data-part-marker ref="marker" v-if="rootContext.multiple.value">
      <CheckboxRaw :model-value="isChecked" />
    </span>

    <SelectItemIndicator v-else data-part-indicator>
      <Icon icon="tabler:check" />
    </SelectItemIndicator>

    <SelectItemText>
      <component v-for="child in children" :is="child" />
    </SelectItemText>
  </SelectItem>
</template>
