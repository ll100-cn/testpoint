<template>
  <component :is="Component" v-bind="props" type="number" v-model="model_value" />
</template>

<script setup lang="ts">
import * as helper from "./helper"
import Component, { Props } from './string.vue'

const props = defineProps<Props>()

const define_model_value = defineModel<any>()
const model_value = helper.modelValue(define_model_value)
</script>
