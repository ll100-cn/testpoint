<template>
  <Text v-bind="delegatedProps" v-model="modelValue" type="color" class="[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch-wrapper]:h-[1.5em]" style="block-size: auto;" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, type HTMLAttributes, type InputHTMLAttributes } from 'vue'
import { type ControlConfig, type FormPresenterConfig, relayFormPresenterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types';
import { Text } from '$ui/input'

const props = defineProps<Partial<ControlConfig> & Partial<FormPresenterConfig>>()

// const emits = defineEmits<AlertDialogEmits>()
const delegatedProps = computed(() => {
  const {  ...delegated } = props
  return delegated
})
// const forwarded = useForwardPropsEmits(props, emits)


const presenterConfig = relayFormPresenterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel<string>()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
console.log(`modalvalue is ${modelValue.value}`)
</script>
