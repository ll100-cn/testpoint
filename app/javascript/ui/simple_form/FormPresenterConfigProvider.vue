<template>
  <slot :config="presenterConfig"></slot>
</template>

<script setup lang="ts" generic="T extends object">
import { relayFormPresenterConfig, type FormPresenterConfig } from './types'
const props = defineProps<Partial<FormPresenterConfig>>()
const presenterConfig = relayFormPresenterConfig(props)
</script>
