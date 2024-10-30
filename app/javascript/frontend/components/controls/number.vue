<template>
  <component :is="Component" type="number" v-model="modelValue" />
</template>

<script setup lang="ts">
import { type ControlConfig, type FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '@/ui/simple_form/types';
import { Validation } from "@/models";
import { computed } from "vue";
import { type ControlProps } from '../simple_form/helper';
import Component from './string.vue';

interface Props extends ControlProps {
}

const props = defineProps<Props & Partial<ControlConfig> & Partial<FormPresenterConfig>>()

const presenterConfig = relayInjectPreseterConfig(props)
const controlConfig = useInjectControlConfig(props)
const defaultModelValue = defineModel()
const modelValue = useInjectControlValue(defaultModelValue)
const validation = computed(() => controlConfig.value.validation ?? new Validation())
</script>
