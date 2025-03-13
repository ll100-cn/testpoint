<template>
  <Text type="number" v-model="modelValue" :id="controlId" />
</template>

<script setup lang="ts">
import { Text } from '$ui/input'
import { type FormPresenterConfig, relayFormPresenterConfig, useControlId, useControlValue } from '$ui/simple_form'

interface Props {
}

const props = defineProps<Props & Partial<FormPresenterConfig>>()

const presenterConfig = relayFormPresenterConfig(props)
const defaultModelValue = defineModel()
const modelValue = useControlValue(defaultModelValue)
const controlId = useControlId()
</script>
