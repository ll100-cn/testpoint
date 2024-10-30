<template>
  <slot :config="presenterConfig"></slot>
</template>

<script setup lang="ts" generic="T extends object">
import { relayInjectPreseterConfig, type FormPresenterConfig } from './types'

const props = defineProps<Partial<FormPresenterConfig>>()
const presenterConfig = relayInjectPreseterConfig(props)
</script>
