<template>
  <component :is="Component" type="number" v-model="modelValue" />
</template>

<script setup lang="ts">
import { ControlConfig, FormPresenterConfig, relayInjectPreseterConfig, useInjectControlConfig, useInjectControlValue } from '$vendor/ui/simple_form/types';
import { Validation } from "@/models";
import { computed } from "vue";
import { ControlProps } from '../simple_form/helper';
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
