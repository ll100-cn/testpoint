<template>
  <Checkbox v-bind="forworded" v-model="modelValue" :options="options" />
</template>

<script lang="ts" setup generic="T">
import { type OptionItem } from "$ui/input"
import { useControlValue, type FormPresenterConfig } from "$ui/simple_form"
import { computed } from 'vue'
import Checkbox, { type Props as CheckboxProps } from "./Checkbox.vue"
import { useForwardProps } from 'reka-ui'

type ItemLabelProps = { [K in keyof T]: T[K] extends string ? K : never }[keyof T]
type ItemValueProps = { [K in keyof T]: T[K] extends string | number | boolean ? K : never }[keyof T]

interface Props extends Omit<CheckboxProps, 'options'> {
  collection: T[]
  itemLabel: ItemLabelProps
  itemValue: ItemValueProps
}

const props = withDefaults(defineProps<Props & Partial<FormPresenterConfig>>(), {})

const defaultModelValue = defineModel<(number | string)[]>()
const modelValue = useControlValue(defaultModelValue)

const forworded = useForwardProps(computed(() => {
  const { collection, itemLabel, itemValue, ...delegated } = props
  return delegated
}))

const options = computed(() => {
  return props.collection.map(item => ({
    label: item[props.itemLabel] as string,
    value: item[props.itemValue] as string | number | boolean | null,
  } satisfies OptionItem))
})
</script>
