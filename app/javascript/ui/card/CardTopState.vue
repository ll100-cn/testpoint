<script setup lang="ts">
import { cn } from '$ui/utils'
import { type HTMLAttributes } from 'vue'
import { relayCardPresenterConfig, useCardPresenter } from './types'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const presenterConfig = relayCardPresenterConfig()
const presenter = useCardPresenter()
</script>

<template>
  <div :class="cn(presenter.topState(presenterConfig), props.class)">
  </div>
</template>
