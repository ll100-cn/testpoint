<template>
  <Button v-if="highlight" class="flex-1 py-0 px-2 justify-start">
    <i class="fal fa-folder-open me-2" />{{ itemTitle }}
    <span class="text-sm">({{ itemCount }})</span>
  </Button>
  <Button v-else variant="secondary" preset="ghost" class="flex-1 py-0 px-2 justify-start">
    <i class="fal fa-folder me-2" />{{ itemTitle }}
    <span class="text-sm">({{ itemCount }})</span>
  </Button>
</template>

<script setup lang="ts">
import { Button } from '$ui/button';

const props = defineProps<{
  highlight: boolean
  itemTitle: string
  itemCount: number | string
}>()
</script>
