<script setup lang="ts">
import { type PrimitiveProps } from 'reka-ui'
import { computed, withDefaults } from 'vue'
import { provideButtonPresenter, relayButtonPresenterConfig, useButtonPresenters, type ButtonPresenter, type ButtonPresenterConfig } from './types'

const presenters = useButtonPresenters()

interface Props extends PrimitiveProps {
  preset?: keyof typeof presenters | ButtonPresenter
}

const props = withDefaults(defineProps<Props & Partial<ButtonPresenterConfig>>(), {
  preset: 'standard',
})

const presenterConfig = relayButtonPresenterConfig(props)
const presenter = provideButtonPresenter(computed(() => {
  return typeof props.preset == 'string' ? presenters[props.preset] : props.preset
}))
</script>

<template>
  <slot></slot>
</template>
