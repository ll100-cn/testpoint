<!--
  SNIP: 3d1baa913cc9ac521abdb154a6bbb538
  FILES:
   - SelectCascader.vue
   - SelectContent.vue
   - SelectGroup.vue
   - SelectItem.vue
   - SelectLabel.vue
   - SelectScrollDownButton.vue
   - SelectScrollUpButton.vue
   - SelectSeparator.vue
   - SelectTrigger.vue
   - SelectValue.vue
   - types.ts => Select-types.ts
   - index.ts => Select-index.ts
-->
<script setup lang="ts">
import { omitProps } from '$ui/utils'
import type { AcceptableValue, SelectRootEmits, SelectRootProps } from 'reka-ui'
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import SelectCascader from './SelectCascader.vue'
import { provideSelectContext, provideSelectPresenter, relaySelectPresenterConfig, useSelectPresenters, type SelectItemAttrs, type SelectPresenter, type SelectPresenterConfig, type SelectPresenters } from './types'

const presenters = useSelectPresenters()

interface Props {
  preset?: keyof SelectPresenters | SelectPresenter
  itemsRepo?: Map<string, SelectItemAttrs>
}

const props = withDefaults(defineProps<Props & Partial<SelectPresenterConfig> & SelectRootProps>(), {
  preset: 'standard',
  multiple: false,
  itemsRepo: () => new Map<string, SelectItemAttrs>(),
})
const emits = defineEmits<SelectRootEmits>()

const presenterConfig = relaySelectPresenterConfig(props)
const presenter = provideSelectPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))

const openRaw = defineModel<boolean>('open')
const open = computed({
  get() { return openRaw.value ?? props.defaultOpen ?? false },
  set(value: boolean) {
    openRaw.value = value
    emits('update:open', value)
  },
})

const modelValueRaw = defineModel<AcceptableValue | AcceptableValue[]>('modelValue')
const modelValue = computed(() =>
  modelValueRaw.value === undefined ? props.defaultValue : modelValueRaw.value
)

function onUpdateModelValue(value: AcceptableValue | AcceptableValue[]) {
  if (!props.multiple) {
    emits('update:modelValue', value)
    return
  }

  emits('update:modelValue', value)
}


const items = computed(() => props.itemsRepo)
const total = computed(() => Array.from(items.value.values()).length)

const context = provideSelectContext({
  findItem(id) {
    return id ? items.value.get(id) ?? null : null
  },

  findItemId(value) {
    return Array.from(items.value.entries()).find(([id, item]) => item.value === value)?.[0] ?? null
  },

  findChildren(parentId) {
    return Array.from(items.value.values()).filter(item => item.group === parentId)
  },

  unregisterItem(id) { items.value.delete(id) },
  registerItem(id, attrs) {
    items.value.set(id, attrs)
  },

  total,
})

const forwarded = computed(() => {
  return omitProps(
    useForwardPropsEmits(
      omitProps(props, 'modelValue', 'open'),
      emits
    ).value,
    'onUpdate:modelValue',
    'onUpdate:open',
  )
})
</script>

<template>
  <SelectRoot v-bind="forwarded" v-model:open="open" :model-value="modelValue" @update:model-value="onUpdateModelValue">
    <SelectCascader>
      <slot />
    </SelectCascader>
  </SelectRoot>
</template>
