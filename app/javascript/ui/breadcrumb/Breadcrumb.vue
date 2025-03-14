<script setup lang="ts">
import { computed, type HTMLAttributes, withDefaults } from 'vue'
import { cn } from '../utils'
import { relayBreadcrumbPresenterConfig, provideBreadcrumbPresenter, type BreadcrumbPresenter, type BreadcrumbPresenterConfig, useBreadcrumbPresenters } from './types'

const presenters = useBreadcrumbPresenters()

interface Props {
  class?: HTMLAttributes['class']
  preset: keyof typeof presenters | BreadcrumbPresenter
}

const props = withDefaults(defineProps<Props & Partial<BreadcrumbPresenterConfig>>(), {
  preset: "standard"
})

const presenterConfig = relayBreadcrumbPresenterConfig(props)
const presenter = provideBreadcrumbPresenter(computed(() =>
  typeof props.preset != 'string' ? props.preset : presenters[props.preset]
))
</script>

<template>
  <nav :class="cn(presenter.root(presenterConfig), props.class)">
    <slot />
  </nav>
</template>
