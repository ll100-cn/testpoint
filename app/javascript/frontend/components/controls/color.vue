<template>
  <InputText v-model="modelValue" type="color" v-bind="delegatedProps" class="[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch-wrapper]:h-[1.5em]" style="block-size: auto;" />
</template>

<script setup lang="ts">
import { Validation } from '@/models'
import { computed, type HTMLAttributes, type InputHTMLAttributes } from 'vue'
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$ui/simple_form/types';
import { default as InputText, type Props } from './string.vue'

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

// const emits = defineEmits<AlertDialogEmits>()
const delegatedProps = computed(() => {
  const { type: _, ...delegated } = props
  return delegated
})
// const forwarded = useForwardPropsEmits(props, emits)


const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
</script>
