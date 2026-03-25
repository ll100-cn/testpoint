<template>
  <Text v-bind="forwarded" v-model="modelValue" type="color" class="[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch-wrapper]:h-[1.5em]" style="block-size: auto;" :id="controlId" />
</template>

<script setup lang="ts">
import { Text } from '$ui/input'
import { type FormPresenterConfig, relayFormPresenterConfig, useControlId, useControlValue } from '$ui/simple_form'
import { computed } from 'vue'
import { useForwardProps } from 'reka-ui'

const props = defineProps<Partial<FormPresenterConfig>>()

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel<string>()
const modelValue = useControlValue(defaultModelValue)
const controlId = useControlId()

const forwarded = useForwardProps(computed(() => {
  const { ...delegated } = props
  return delegated
}))
</script>
