<template>
  <Text type="number" v-model="modelValue" />
</template>

<script setup lang="ts">
import { Text } from '$ui/input'
import { type ControlConfig, type FormPresenterConfig, relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types'
import { Validation } from "@/models"
import { computed } from "vue"
import { type ControlProps } from '../simple_form/helper'

interface Props extends ControlProps {
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
</script>
