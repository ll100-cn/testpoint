<template>
  <SelectdropMenuGroup v-if="!_.isEmpty(option.children)" v-bind="forwardedProps" />
  <SelectdropMenuEntry v-else v-bind="forwardedProps" />
</template>

<script lang="ts">
export interface Props {
  option: SelectdropMenuOption
}
</script>

<script setup lang="ts">
import _ from 'lodash'
import { computed } from 'vue'
import { type SelectdropMenuOption } from "./types"
import SelectdropMenuGroup from "./SelectdropMenuGroup.vue"
import SelectdropMenuEntry from "./SelectdropMenuEntry.vue"
import { useForwardProps } from 'reka-ui'

const props = defineProps<Props>()

const delegatedProps = computed(() => {
  const { ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>
