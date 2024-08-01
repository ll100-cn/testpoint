<template>
  <DropdownMenu>
    <DropdownMenuTrigger :class="props.class">
      <i class="far fa-ellipsis-h"></i>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { onMounted, ref, type HTMLAttributes } from 'vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '$vendor/ui'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

onMounted(() => {
})
</script>
